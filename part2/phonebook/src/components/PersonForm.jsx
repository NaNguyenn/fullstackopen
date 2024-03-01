const PersonForm = ({
  onPersonFormSubmit,
  onChangeName,
  onChangePhone,
  valueName,
  valuePhone,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={onChangeName} value={valueName} />
      </div>
      <div>
        number: <input onChange={onChangePhone} value={valuePhone} />
      </div>
      <div>
        <button type="submit" onClick={onPersonFormSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
