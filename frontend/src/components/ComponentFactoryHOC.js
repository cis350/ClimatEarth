/**
 * this HOC creates stateless
 * component
 */

let key = 0;

function CreateComponent({ type, eventHandler, text }) {
  key += 1;
  if (type && type === 'input' && eventHandler) {
    return (
      <input
        type="text"
        key={key}
        name={text}
        onChange={eventHandler}
        className="input-field"
        placeholder={text.charAt(0).toUpperCase() + text.slice(1)} // Capitalize the first letter of text
      />
    );
  }
  if (type && type === 'button' && eventHandler) {
    return (
      <button type="button" key={key} onClick={eventHandler} className="button">
        {text}
      </button>
    );
  }
  if (type && type === 'cta-button' && eventHandler) {
    return (
      <button type="cta-button" key={key} onClick={eventHandler} className="cta-button">
        {text}
      </button>
    );
  }
}

export default CreateComponent;