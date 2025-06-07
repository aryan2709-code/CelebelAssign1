export default function InputField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    placeholder,
}) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block font-semibold text-sm mb-1">
                {label}
            </label>

            <input 
             type = {type}
             name= {name}
             id = {name}
             value = {value}
             onChange = {onChange}
             onBlur={onBlur}
             placeholder={placeholder}
             className= {
                `w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300' } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ` 
             }
             />
             {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}