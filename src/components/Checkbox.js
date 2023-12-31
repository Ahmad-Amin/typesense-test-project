const Checkbox = ({ record, checked, onChange, label }) => (
  <label className="flex justify-start items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      value={record.value}
      checked={checked}
      onChange={onChange}
    />
    {record.value}
  </label>
);

export default Checkbox;
