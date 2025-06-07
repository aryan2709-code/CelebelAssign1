import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "./input";
import SelectField from "./SelectField";

const countryCityMap = {
    India : ['Delhi' , 'Mumbai' , 'Bangalore' , 'Chennai' ],
    USA : ['New York' , 'Chicago' , 'Los Angeles'],
    Canada : ['Toronto' , 'vancouver' , 'Montreal'],
};

export default function Form() {
    const navigate = useNavigate();

    //Form state is saved by using useState Hook
    const [formData , setFormData] = useState({
        firstName : '',
        lastName : '',
        username : '',
        email : '',
        password : '',
        phoneCode : '',
        phoneNumber : '',
        country: '',
        city:'',
        aadhar:'',
    });

    // error state
    const [errors , setErrors] = useState({});
    const [showPassword , setShowPassword] = useState(false);

    // Regex Validators 
    const validators = {
        firstName : val => /^[A-Za-z]{2,}$/.test(val) || 'First Name must be at least 2 letters.',
        lastName : val => /^[A-Za-z]{2,}$/.test(val) || 'Last name must be at least 2 letters.',
        username : val => /^[A-Za-z0-9_]{4,}$/.test(val) || 'Username must be at least 4 characters and no special chars.',
        email : val => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) || 'Invalid email address.',
        password : val => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(val) || 'Password must be 6+ chars with letters and numbers.',
        phonecode : val=> /^\+\d{1,4}$/.test(val) || 'Invalid country code . ',
        phoneNumber : val => /^\d{7,12}$/.test(val) || 'Phone Number must be 7 to 12 digits.',
        country : val => !!val || 'Country is required.',
        city : val => !!val || 'City is required.',
        pan:val =>  /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val) || 'Invalid PAN number.',
        aadhar: val => /^\d{12}$/.test(val) || 'Aadhar Number must be exactly 12 digits.',
    };

    const validateField = (name , value) => {
        const valid = validators[name]?.(value);
        setErrors(prev => ({...prev , [name]: valid === true ? '' : valid}));
    };

    const handleChange = e => {
        const {name , value } = e.target;
        setFormData(prev = ({...prev,[name]:value}));
    };

    const handleBlur = e => {
        const {name , value } = e.target;
        validateField(name,value);
    }

    const isFormValid = () => {
        return Object.entries(formData).every(([key , val]) => {
            const valid = validators[key]?.(val);
            return valid === true;
        } );
    };

    const handleSubmit = e => {
        e.preventDefault();
        const newErrors = {};
    for(let key in formData)
    {
        const valid = validators[key]?.(formData[key]);
        if(valid !== true) newErrors[key] = valid;
    }
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0){
        navigate('/success', {state : formData});
    }
    }

    return (
         <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Internship Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lastName}
        />
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <div className="relative">
          <InputField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
          <button
            type="button"
            className="absolute top-9 right-3 text-sm text-blue-600"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="flex gap-4">
          <InputField
            label="Country Code"
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phoneCode}
            placeholder="+91"
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phoneNumber}
          />
        </div>
        <SelectField
          label="Country"
          name="country"
          value={formData.country}
          onChange={e => {
            handleChange(e);
            setFormData(prev => ({ ...prev, city: '' }));
          }}
          onBlur={handleBlur}
          options={Object.keys(countryCityMap)}
          error={errors.country}
        />
        {formData.country && (
          <SelectField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            options={countryCityMap[formData.country]}
            error={errors.city}
          />
        )}
        <InputField
          label="PAN Number"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.pan}
        />
        <InputField
          label="Aadhar Number"
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.aadhar}
        />
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-2 mt-4 font-semibold rounded ${
            isFormValid()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </form>
    </div>
    );
}

