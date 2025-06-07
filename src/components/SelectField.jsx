export default function SelectField({
    label,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    error,
}) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block font-semibold text-sm mb-1">
                {label}
            </label>
            <select
            name = {name}
            id = {name}
            value = {value}
            onChange={onChange}
            onBlur = {onBlur}
            className={`w-full px-3 py-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
            }rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >

            <option value= "">Select {label}</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ) )}
            </select>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}