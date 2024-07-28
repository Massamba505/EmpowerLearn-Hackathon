// import React, { useState, useEffect, useRef } from 'react';
// import {
//   CallClient,
//   VideoStreamRenderer,
//   LocalVideoStream
// } from '@azure/communication-calling';
// import { AzureCommunicationTokenCredential } from '@azure/communication-common';
// import './style.css';

// const VideoChat = () => {
//   const [callAgent, setCallAgent] = useState(null);
//   const [deviceManager, setDeviceManager] = useState(null);
//   const [call, setCall] = useState(null);
//   const [incomingCall, setIncomingCall] = useState(null);
//   const [localVideoStream, setLocalVideoStream] = useState(null);
//   const [remoteParticipants, setRemoteParticipants] = useState([]);

//   const localVideoRef = useRef(null);
//   const remoteVideoRefs = useRef([]);

//   useEffect(() => {
//     if (callAgent) {
//       callAgent.on('incomingCall', (args) => {
//         setIncomingCall(args.incomingCall);
//         document.getElementById('accept-call-button').disabled = false;
//         document.getElementById('start-call-button').disabled = true;
//       });
//     }
//   }, [callAgent]);

//   const handleInitializeCallAgent = async () => {
//     try {
//       const callClient = new CallClient();
//       const tokenCredential = new AzureCommunicationTokenCredential(document.getElementById('user-access-token').value.trim());
//       const agent = await callClient.createCallAgent(tokenCredential);
//       setCallAgent(agent);

//       const manager = await callClient.getDeviceManager();
//       setDeviceManager(manager);
//       await manager.askDevicePermission({ video: true });
//       await manager.askDevicePermission({ audio: true });

//       document.getElementById('start-call-button').disabled = false;
//       document.getElementById('initialize-call-agent').disabled = true;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleStartCall = async () => {
//     try {
//       const stream = await createLocalVideoStream();
//       const videoOptions = stream ? { localVideoStreams: [stream] } : undefined;
//       const currentCall = callAgent.startCall([{ communicationUserId: document.getElementById('callee-acs-user-id').value.trim() }], { videoOptions });
//       setCall(currentCall);
//       subscribeToCall(currentCall);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAcceptCall = async () => {
//     try {
//       const stream = await createLocalVideoStream();
//       const videoOptions = stream ? { localVideoStreams: [stream] } : undefined;
//       const acceptedCall = await incomingCall.accept({ videoOptions });
//       setCall(acceptedCall);
//       subscribeToCall(acceptedCall);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const createLocalVideoStream = async () => {
//     const camera = (await deviceManager.getCameras())[0];
//     if (camera) {
//       const localStream = new LocalVideoStream(camera);
//       setLocalVideoStream(localStream);
//       await displayLocalVideoStream(localStream);
//       return localStream;
//     } else {
//       console.error('No camera device found on the system');
//     }
//   };

//   const displayLocalVideoStream = async (localStream) => {
//     const renderer = new VideoStreamRenderer(localStream);
//     const view = await renderer.createView();
//     localVideoRef.current.appendChild(view.target);
//     document.getElementById('localVideoContainer').hidden = false;
//   };

//   const subscribeToCall = (currentCall) => {
//     currentCall.on('idChanged', () => {
//       console.log(`Call Id changed: ${currentCall.id}`);
//     });

//     currentCall.on('stateChanged', () => {
//       if (currentCall.state === 'Connected') {
//         document.getElementById('connectedLabel').hidden = false;
//         document.getElementById('accept-call-button').disabled = true;
//         document.getElementById('start-call-button').disabled = true;
//         document.getElementById('hangup-call-button').disabled = false;
//         document.getElementById('start-video-button').disabled = false;
//         document.getElementById('stop-video-button').disabled = false;
//         document.getElementById('remoteVideosGallery').hidden = false;
//       } else if (currentCall.state === 'Disconnected') {
//         document.getElementById('connectedLabel').hidden = true;
//         document.getElementById('start-call-button').disabled = false;
//         document.getElementById('hangup-call-button').disabled = true;
//         document.getElementById('start-video-button').disabled = true;
//         document.getElementById('stop-video-button').disabled = true;
//       }
//     });

//     currentCall.localVideoStreams.forEach(async (lvs) => {
//       setLocalVideoStream(lvs);
//       await displayLocalVideoStream(lvs);
//     });

//     currentCall.on('localVideoStreamsUpdated', (e) => {
//       e.added.forEach(async (lvs) => {
//         setLocalVideoStream(lvs);
//         await displayLocalVideoStream(lvs);
//       });
//       e.removed.forEach((lvs) => {
//         removeLocalVideoStream();
//       });
//     });

//     currentCall.remoteParticipants.forEach((remoteParticipant) => {
//       subscribeToRemoteParticipant(remoteParticipant);
//     });

//     currentCall.on('remoteParticipantsUpdated', (e) => {
//       e.added.forEach((remoteParticipant) => {
//         subscribeToRemoteParticipant(remoteParticipant);
//       });
//       e.removed.forEach((remoteParticipant) => {
//         removeRemoteParticipant(remoteParticipant);
//       });
//     });
//   };

//   const subscribeToRemoteParticipant = (remoteParticipant) => {
//     remoteParticipant.on('stateChanged', () => {
//       console.log(`Remote participant state changed: ${remoteParticipant.state}`);
//     });

//     remoteParticipant.videoStreams.forEach((remoteVideoStream) => {
//       subscribeToRemoteVideoStream(remoteVideoStream, remoteParticipant);
//     });

//     remoteParticipant.on('videoStreamsUpdated', (e) => {
//       e.added.forEach((remoteVideoStream) => {
//         subscribeToRemoteVideoStream(remoteVideoStream, remoteParticipant);
//       });
//       e.removed.forEach((remoteVideoStream) => {
//         removeRemoteVideoStream(remoteVideoStream, remoteParticipant);
//       });
//     });
//   };

//   const subscribeToRemoteVideoStream = async (remoteVideoStream, remoteParticipant) => {
//     const renderer = new VideoStreamRenderer(remoteVideoStream);
//     const view = await renderer.createView();
//     const videoElement = view.target;

//     if (!remoteVideoRefs.current[remoteParticipant.identifier.communicationUserId]) {
//       remoteVideoRefs.current[remoteParticipant.identifier.communicationUserId] = [];
//     }

//     remoteVideoRefs.current[remoteParticipant.identifier.communicationUserId].push(videoElement);
//     document.getElementById('remoteVideosGallery').appendChild(videoElement);

//     remoteVideoStream.on('isAvailableChanged', async () => {
//       if (remoteVideoStream.isAvailable) {
//         if (!document.body.contains(videoElement)) {
//           document.getElementById('remoteVideosGallery').appendChild(videoElement);
//         }
//       } else {
//         document.getElementById('remoteVideosGallery').removeChild(videoElement);
//       }
//     });
//   };

//   const removeLocalVideoStream = () => {
//     if (localVideoRef.current) {
//       while (localVideoRef.current.firstChild) {
//         localVideoRef.current.removeChild(localVideoRef.current.firstChild);
//       }
//     }
//   };

//   const removeRemoteParticipant = (remoteParticipant) => {
//     if (remoteVideoRefs.current[remoteParticipant.identifier.communicationUserId]) {
//       remoteVideoRefs.current[remoteParticipant.identifier.communicationUserId].forEach(videoElement => {
//         document.getElementById('remoteVideosGallery').removeChild(videoElement);
//       });
//       delete remoteVideoRefs.current[remoteParticipant.identifier.communicationUserId];
//     }
//   };

//   const removeRemoteVideoStream = (remoteVideoStream, remoteParticipant) => {
//     if (remoteVideoRefs.current[remoteParticipant.identifier.communicationUserId]) {
//       const videoElements = remoteVideoRefs.current[remoteParticipant.identifier.communicationUserId];
//       const videoElementToRemove = videoElements.find(videoElement => videoElement.srcObject === remoteVideoStream);

//       if (videoElementToRemove) {
//         document.getElementById('remoteVideosGallery').removeChild(videoElementToRemove);
//         remoteVideoRefs.current[remoteParticipant.identifier.communicationUserId] = videoElements.filter(
//           videoElement => videoElement !== videoElementToRemove
//         );
//       }
//     }
//   };

//   const handleHangUpCall = async () => {
//     await call.hangUp();
//     setCall(null);
//     setRemoteParticipants([]);
//     document.getElementById('remoteVideosGallery').hidden = true;
//     removeLocalVideoStream();
//   };

//   const handleStartVideo = async () => {
//     const stream = await createLocalVideoStream();
//     await call.startVideo(stream);
//   };

//   const handleStopVideo = async () => {
//     await call.stopVideo(localVideoStream);
//     removeLocalVideoStream();
//   };

//   return (
//     <div className="app">
//       <div className="container">
//         <h4>Azure Communication Services - Calling Web SDK</h4>
//         <input id="user-access-token" type="text" placeholder="User access token" className="input" />
//         <button id="initialize-call-agent" onClick={handleInitializeCallAgent} className="button">Initialize Call Agent</button>
//         <input id="callee-acs-user-id" type="text" placeholder="Callee ACS User ID" className="input" />
//         <button id="start-call-button" onClick={handleStartCall} className="button" disabled>Start Call</button>
//         <button id="accept-call-button" onClick={handleAcceptCall} className="button" disabled>Accept Call</button>
//         <button id="hangup-call-button" onClick={handleHangUpCall} className="button" disabled>Hang Up</button>
//         <button id="start-video-button" onClick={handleStartVideo} className="button" disabled>Start Video</button>
//         <button id="stop-video-button" onClick={handleStopVideo} className="button" disabled>Stop Video</button>
//         <div id="connectedLabel" hidden className="status">Connected</div>
//         <div id="localVideoContainer" className="local-video" ref={localVideoRef} hidden></div>
//         <div id="remoteVideosGallery" className="remote-videos" hidden></div>
//       </div>
//     </div>
//   );
// };

import React, { useEffect } from 'react';

const VideoChat = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:8080/';
  }, []);

  return (
    <div>Redirecting to Video Chat...</div>
  );
}

export default VideoChat;