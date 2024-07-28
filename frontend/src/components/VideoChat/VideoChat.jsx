import { useState, useEffect } from 'react';
import {
  CallClient,
  VideoStreamRenderer,
  LocalVideoStream,
} from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { AzureLogger, setLogLevel } from '@azure/logger';
import './style.css';

const API_ENDPOINT = '/api/user/token';

setLogLevel('verbose');
AzureLogger.log = (...args) => {
  console.log(...args);
};

const VideoChat = () => {
  const [userAccessToken, setUserAccessToken] = useState('');
  const [calleeAcsUserId, setCalleeAcsUserId] = useState('');
  const [callAgent, setCallAgent] = useState(null);
  const [deviceManager, setDeviceManager] = useState(null);
  const [call, setCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [localVideoStream, setLocalVideoStream] = useState(null);
  const [localVideoStreamRenderer, setLocalVideoStreamRenderer] = useState(null);
  const [connected, setConnected] = useState(false);
  const [remoteVideoStreams, setRemoteVideoStreams] = useState([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch(API_ENDPOINT, { method: 'POST' });
        const data = await response.json();
        setUserAccessToken(data.token);
      } catch (error) {
        console.error('Failed to fetch access token', error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (callAgent) {
      callAgent.on('incomingCall', async (args) => {
        setIncomingCall(args.incomingCall);
      });
    }
  }, [callAgent]);

  const initializeCallAgent = async () => {
    try {
      const callClient = new CallClient();
      const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken.trim());
      const agent = await callClient.createCallAgent(tokenCredential);
      const manager = await callClient.getDeviceManager();
      await manager.askDevicePermission({ video: true });
      await manager.askDevicePermission({ audio: true });
      setCallAgent(agent);
      setDeviceManager(manager);
    } catch (error) {
      console.error(error);
    }
  };

  const createLocalVideoStream = async () => {
    const camera = (await deviceManager.getCameras())[0];
    if (camera) {
      return new LocalVideoStream(camera);
    } else {
      console.error('No camera device found on the system');
    }
  };

  const displayLocalVideoStream = async (localVideoStream) => {
    try {
      const renderer = new VideoStreamRenderer(localVideoStream);
      const view = await renderer.createView();
      document.getElementById('localVideoContainer').appendChild(view.target);
      setLocalVideoStreamRenderer(renderer);
    } catch (error) {
      console.error(error);
    }
  };

  const displayRemoteVideoStream = async (remoteVideoStream, participantId) => {
    try {
      const renderer = new VideoStreamRenderer(remoteVideoStream);
      const view = await renderer.createView();
      const remoteVideoContainer = document.getElementById(`remoteVideoContainer-${participantId}`);
      if (remoteVideoContainer) {
        remoteVideoContainer.appendChild(view.target);
      } else {
        console.error(`No container found for remote participant: ${participantId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startCall = async () => {
    try {
      const localStream = await createLocalVideoStream();
      const options = localStream ? { localVideoStreams: [localStream] } : undefined;
      const newCall = callAgent.startCall([{ communicationUserId: calleeAcsUserId.trim() }], { videoOptions: options });
      subscribeToCall(newCall);
      setCall(newCall);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptCall = async () => {
    try {
      const localStream = await createLocalVideoStream();
      const options = localStream ? { localVideoStreams: [localStream] } : undefined;
      const newCall = await incomingCall.accept({ videoOptions: options });
      subscribeToCall(newCall);
      setCall(newCall);
    } catch (error) {
      console.error(error);
    }
  };

  const subscribeToCall = (call) => {
    call.on('stateChanged', async () => {
      if (call.state === 'Connected') {
        setConnected(true);
        subscribeToRemoteParticipants(call.remoteParticipants);
      } else if (call.state === 'Disconnected') {
        setConnected(false);
        setRemoteVideoStreams([]);
      }
    });

    call.localVideoStreams.forEach(async (lvs) => {
      setLocalVideoStream(lvs);
      await displayLocalVideoStream(lvs);
    });

    call.on('localVideoStreamsUpdated', (e) => {
      e.added.forEach(async (lvs) => {
        setLocalVideoStream(lvs);
        await displayLocalVideoStream(lvs);
      });
      e.removed.forEach(() => {
        setLocalVideoStream(null);
      });
    });

    call.on('remoteParticipantsUpdated', (e) => {
      subscribeToRemoteParticipants(e.added);
      e.removed.forEach((participant) => {
        setRemoteVideoStreams((streams) => streams.filter((stream) => stream.participantId !== participant.identifier.communicationUserId));
      });
    });
  };

  const subscribeToRemoteParticipants = (participants) => {
    participants.forEach((participant) => {
      participant.on('videoStreamsUpdated', (e) => {
        e.added.forEach((videoStream) => {
          setRemoteVideoStreams((streams) => [
            ...streams,
            { participantId: participant.identifier.communicationUserId, videoStream }
          ]);
          displayRemoteVideoStream(videoStream, participant.identifier.communicationUserId);
        });
        e.removed.forEach((videoStream) => {
          setRemoteVideoStreams((streams) => streams.filter((stream) => stream.videoStream !== videoStream));
        });
      });
    });
  };

  const hangUpCall = async () => {
    await call.hangUp();
    setCall(null);
  };

  const startVideo = async () => {
    const localStream = await createLocalVideoStream();
    await call.startVideo(localStream);
  };

  const stopVideo = async () => {
    await call.stopVideo(localVideoStream);
  };

  return (
    <div>
      <h4>Live Tutoring</h4>
      <button id="initialize-call-agent" type="button" onClick={initializeCallAgent}>
        Initialize Call Agent
      </button>
      <br />
      <br />
      <input
        id="callee-acs-user-id"
        type="text"
        placeholder="Enter callee's Azure Communication Services user identity in format: '8:acs:resourceId_userId'"
        value={calleeAcsUserId}
        onChange={(e) => setCalleeAcsUserId(e.target.value)}
        style={{ marginBottom: '1em', width: '500px', display: 'block' }}
      />
      <button id="start-call-button" type="button" onClick={startCall} disabled={!callAgent}>
        Start Call
      </button>
      <button id="hangup-call-button" type="button" onClick={hangUpCall} disabled={!connected}>
        Hang up Call
      </button>
      <button id="accept-call-button" type="button" onClick={acceptCall} disabled={!incomingCall}>
        Accept Call
      </button>
      <button id="start-video-button" type="button" onClick={startVideo} disabled={!connected}>
        Start Video
      </button>
      <button id="stop-video-button" type="button" onClick={stopVideo} disabled={!connected}>
        Stop Video
      </button>
      <br />
      <br />
      <div id="connectedLabel" style={{ color: '#13bb13', display: connected ? 'block' : 'none' }}>
        Call is connected!
      </div>
      <br />
      <div id="remoteVideosGallery" style={{ width: '40%', display: connected ? 'block' : 'none' }}>
        {remoteVideoStreams.map((stream) => (
          <div key={stream.participantId} id={`remoteVideoContainer-${stream.participantId}`}>
            Remote participant video stream for: {stream.participantId}
          </div>
        ))}
      </div>
      <br />
      <div id="localVideoContainer" style={{ width: '30%', display: localVideoStream ? 'block' : 'none' }}>
        Local video stream:
      </div>
    </div>
  );
};

export default VideoChat;
