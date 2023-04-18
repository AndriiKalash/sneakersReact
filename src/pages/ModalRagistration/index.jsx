import {useState }  from 'react';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';

import {registrationSelector, trigerModal } from '../../redux/registration/registrationSlice';
import { FormBlock } from '../../components'
import styles from './Modal.module.scss';


const ModalRegistration = () => {

    const {modalOpen} = useSelector(registrationSelector);
    const [showForm, setShowForm] = useState(true);
    const dispatch = useDispatch();
     

   //Transition :
   const duration = 300;
   const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity:0,
    visibility:"hidden"
   }
   const transitionStyles = {
    entering: {opacity:1, visibility:"visible"},
    entered: {opacity:1, visibility:"visible"},
    exiting: {opacity:0, visibility:"hidden"},
    exited: {opacity:0, visibility:"hidden"},
   };


    return (
    
        <Transition  timeout={duration} in={modalOpen} >
            {
                state=> (
                    <div className={styles.registerVisible} 
                         style={{...defaultStyle, ...transitionStyles[state]}}>
                       <div className="popup-dialog">
                          <div className={styles.content}>
                               <img onClick={()=>dispatch(trigerModal(false))} class={`removeBtn cu-p ${styles.trigerBtn}`} src="img/btn-remove.svg" alt="close"/>
                               <div className={styles.title}>
                                   <button onClick={()=>setShowForm(false)}  className={styles.choiceBtn}>Login </button>
                                   <button onClick={()=>setShowForm(true)}  className={styles.choiceBtn}>Register</button>
                               </div>
                               <FormBlock 
                                changeForm={showForm} onChangeForm={setShowForm} 
                               />
                            </div>
                        </div>
                    </div>
                )
            }
        </Transition>
    );
}

export default ModalRegistration;


