import { useRef} from "react";
import { SwitchTransition, CSSTransition  } from 'react-transition-group';

import {checkUser, getUser, registrationSelector} from "../../redux/registration/registrationSlice";
import {postUser} from "../../services/SneakersService";
import { FormComponent } from "./FormComponent";
import "./transitionsStyle.scss";
import { useDispatch, useSelector } from "react-redux";


export const FormBlock = ({changeForm, onChangeForm}) => {
  
  const {statusUser } = useSelector(registrationSelector);
  const dispatch = useDispatch();
   
  const getLogin = (values) => {
    dispatch(checkUser(values));
    dispatch(getUser("https://62837a1092a6a5e46224964a.mockapi.io/cart"));                           
  }
  const postRegister = (value) => {
    onChangeForm(false);
    postUser(value)
  }

    // variables for CSSTransition:
    const registerRef = useRef(null);
    const loginref = useRef(null);
    const nodeRef = changeForm ? registerRef : loginref;

    return(
      
      <div>
        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={changeForm}
            nodeRef={nodeRef}
            addEndListener={(done) => {
              nodeRef.current.addEventListener("transitionend", done, false);
            }}
            classNames="fade">
            <div ref={nodeRef}>
                {changeForm ?   
                (<FormComponent btn={"REGISTER"} submit={postRegister} />) :
                (<FormComponent btn={"LOGIN"} submit={getLogin} loadingProcess={statusUser} />)
                } 
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
  );
}
   
  
  
    
   

