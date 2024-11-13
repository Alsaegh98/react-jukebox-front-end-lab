import { useState } from 'react';

const TrackForm = (props) => {
  const initialState = props.selected ? props.selected : { title: '', artist: '' };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value }); // Corrected name to evt.target.name
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (props.selected) {
      props.handleUpdateTrack(formData, props.selected._id);
    } else {
      props.handleAddTrack(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title" // Corrected name
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="artist">Artist</label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
        <button type="submit">{props.selected ? 'Update Track' : 'Add New Track'}</button>
      </form>
    </div>
  );
};

export default TrackForm;
