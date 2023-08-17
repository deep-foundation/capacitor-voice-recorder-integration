import { DeepClient } from "@deep-foundation/deeplinks/imports/client.js";
import { VoiceRecorder } from "capacitor-voice-recorder";
import { uploadRecords } from "./upload-records.js";


export interface ISound { // Represents a recorded sound.
  recordDataBase64: string; // Base64-encoded audio data.
  msDuration: number; // Duration of the recording in milliseconds.
  mimeType: string; // The MIME type of the audio file.
}


export interface IStopRecordingOptions { // Represents the parameters for stopping a recording.
  deep: DeepClient; // The DeepClient object used for communication.
  /**
   * The ID of the container link.
   * 
   * @defaultValue deep.linkId
   */
  containerLinkId?: number; // The ID of the container link.
  startTime: string; // The start time of the recording.
}

// stopRecording function stops the ongoing recording and uploads the recorded sound.

export async function stopRecording({
  deep,
  containerLinkId = deep.linkId!,
  startTime,
}: IStopRecordingOptions): Promise<ISound> {
  const { value: sound } = await VoiceRecorder.stopRecording(); // Stop the recording and obtain the recorded sound.
  const endTime = new Date().toLocaleDateString(); // Get the end time of the recording.
  await uploadRecords({ deep, containerLinkId, records: [{ sound, startTime, endTime }] }); // Upload the recorded sound.
  return sound; // Return the recorded sound.
}