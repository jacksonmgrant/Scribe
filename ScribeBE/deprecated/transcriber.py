import os
import shutil
import time
import azure.cognitiveservices.speech as speechsdk
from fastapi import UploadFile
from datetime import datetime


def transcribe(file: UploadFile) -> str:
    """Transcribe the file using the Azure Speech SDK and return it as a string. This function is used for production purposes.
    Uses continuous recognition to control when to stop the recognition process.
    
    :param file: The file to transcribe
    :return: The transcribed text."""
    #Continuous recognition tutorial: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech?pivots=programming-language-python#use-continuous-recognition
    #Want to add language identification: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-identification?pivots=programming-language-python#speech-to-text
    
    #Create a temporary audio file
    file_name = f"{str(datetime.now().strftime('%Y-%m-%d_%H-%M-%S'))}_{file.filename}"
    file_path = os.path.join("Uploads", file_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    #Configuration
    speech_config = speechsdk.SpeechConfig(subscription=os.environ.get('SPEECH_KEY'), region=os.environ.get('SPEECH_REGION'))
    speech_config.speech_recognition_language="en-US"
    
    #Send audio to Azure
    audio_config = speechsdk.audio.AudioConfig(filename=file_path)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)


    #Continuous recognition
    speech = ""

    #Collect result
    done = False
    def stop_cb(evt):
        print('Recognizing on {}'.format(evt))
        nonlocal speech
        if evt.result.reason == speechsdk.ResultReason.RecognizedSpeech:
            speech = speech + " " + evt.result.text
        else:
            speech = "Error: " + evt.result.reason

    #End recognition
    def end_of_stream_cb(evt):
        print('End of stream detected')
        nonlocal done
        done = True
        speech_recognizer.stop_continuous_recognition_async()
        # Clean up: remove the temporary file
        # Won't run if an error stops the function before this
        os.remove(file_path)

    speech_recognizer.recognized.connect(stop_cb)
    speech_recognizer.session_stopped.connect(stop_cb)
    speech_recognizer.canceled.connect(stop_cb)
    speech_recognizer.session_stopped.connect(end_of_stream_cb)
    
    #Initiate recognition
    speech_recognizer.start_continuous_recognition_async()
    while not done:
        time.sleep(.5)
    
    return speech
    


def transcribe_test(file: str) -> str:
    """Transcribe the file from a local path on the server using the Azure Speech SDK. This function is used for testing purposes.
    Uses single shot recognition, so the maximum audio length is 15 seconds.
    
    :param file: The path to the file to transcribe.
    :return: The transcribed text."""

    speech_config = speechsdk.SpeechConfig(subscription=os.environ.get('SPEECH_KEY'), region=os.environ.get('SPEECH_REGION'))
    speech_config.speech_recognition_language="en-US"

    #To recognize speech from the microphone:
    #audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)
    #To recognize speech from an uncompressed file:
    audio_config = speechsdk.audio.AudioConfig(filename=file)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    print("Speak into your microphone.")
    #speech_recognition_result = speech_recognizer.recognize_once_async().get()

    speech = ""

    #Continuous recognition
    done = False
    def stop_cb(evt):
        print('CLOSING on {}'.format(evt))
        nonlocal done
        done = True
        nonlocal speech        
        speech = evt.result.text
        speech_recognizer.stop_continuous_recognition()


    speech_recognizer.recognized.connect(stop_cb)
    speech_recognizer.session_stopped.connect(stop_cb)
    speech_recognizer.canceled.connect(stop_cb)
    
    #Collect result
    speech_recognizer.start_continuous_recognition()
    while not done:
        time.sleep(.5)
    
    return speech

    '''if speech_recognition_result.reason == speechsdk.ResultReason.RecognizedSpeech:
        return "{}".format(speech_recognition_result.text)
    elif speech_recognition_result.reason == speechsdk.ResultReason.NoMatch:
        return "No speech could be recognized: {}".format(speech_recognition_result.no_match_details)
    elif speech_recognition_result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = speech_recognition_result.cancellation_details
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("Error details: {}".format(cancellation_details.error_details))
            print("Did you set the speech resource key and region values?")
        return "Speech Recognition canceled: {}".format(cancellation_details.reason)'''
    


#print(transcribe_test("Samples\Conference.wav"))