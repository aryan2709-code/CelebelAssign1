import { useLocation, useNavigate } from "react-router-dom";

export default function SuccessPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    if(!formData){
        //Redirect back to form if the user visits directly
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-xl w-full">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Form Submitted Successfully!</h2>
                <ul className="space-y-2 text-gray-700">
                    {Object.entries(formData).map(([key , value]) => (
                        <li key={key}>
                            <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                        </li>
                    ) )}
                </ul>
            </div>
        </div>
    );
}