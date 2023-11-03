const LoginValidate = (values) => {
    let errors={}
    if(!values.email){
        errors.email="Email is Required"
    }else if(!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
        errors.email="Email address invalid"
    }

    if(!values.password){
        errors.password="Password is Required"
    }

    return errors;
};

export {
    LoginValidate
};