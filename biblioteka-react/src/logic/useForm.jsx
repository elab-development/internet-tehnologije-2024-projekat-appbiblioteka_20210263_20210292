import React from "react";

const useForm = (initialStateOfData) => {

    const [data, setData] = React.useState(initialStateOfData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const clearForm = () => {
        setData(initialStateOfData);
    };

    return {
        data,
        handleChange,
        clearForm,
    }
}

export default useForm;
