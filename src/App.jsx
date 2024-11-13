import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import NowPlaying from './components/NowPlaying';

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null); // Added state for currently playing track

  useEffect(() => {
    async function getTracks() {
      try {
        const allTracks = await trackService.index();
        if (allTracks.error) {
          throw new Error(allTracks.error);
        }
        setTracks(allTracks);
      } catch (error) {
        console.log(error);
      }
    }

    getTracks();
  }, []);

  const updateSelected = (track) => {
    setSelected(track);
  };

  const handleAddTracks = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      setTracks([newTrack, ...tracks]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId);

      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }

      const newTracksList = tracks.map((track) => {
        if (track._id !== updatedTrack._id) {
          return track;
        } else {
          return updatedTrack;
        }
      });

      setTracks(newTracksList);
      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormView = (track) => {
    if (!track) {
      setSelected(null);
    }

    setIsFormOpen(!isFormOpen);
  };

  const handleRemoveTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);

      if (deletedTrack.error) {
        throw new Error(deletedTrack.error);
      }

      setTracks(tracks.filter((track) => track._id !== trackId));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlay = (track) => {
    setCurrentTrack(track); // Set the current track to the selected track
  };

  return (
    <>
      <TrackList
        trackList={tracks}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        handleRemoveTrack={handleRemoveTrack}
        handlePlay={handlePlay} // Pass handlePlay to TrackList
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TrackForm
          handleAddTrack={handleAddTracks}
          selected={selected}
          handleUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <NowPlaying
          selected={currentTrack} // Use currentTrack as selected track for NowPlaying
        />
      )}
    </>
  );
}
