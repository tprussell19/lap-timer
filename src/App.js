import { useState, useEffect } from 'react';
import { IonApp, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonText } from '@ionic/react';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => {

  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let time = null;
    if (timerRunning) {
      time = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10);
    } else {
      clearInterval(time);
    }
    return () => clearInterval(time)
  }, [timerRunning])

  const onLap = () => {
    let lapTime = time - laps.reduce((a, b) => a + b, 0);
    setLaps(prevLaps => [...prevLaps, lapTime]);
  }

  const onReset = () => {
    setTime(0);
    setTimerRunning(false);
    setLaps([]);
  }


  const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
  const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
  const milliseconds = ("0" + Math.floor((time / 10) % 100)).slice(-2);

  const showLaps = laps.map((lap, i) => {
    const lapMinutes = ("0" + Math.floor((lap / 60000) % 60)).slice(-2);
    const lapSeconds = ("0" + Math.floor((lap / 1000) % 60)).slice(-2);
    const lapMilliseconds = ("0" + Math.floor((lap / 10) % 100)).slice(-2);
    return (
      <div><p key={i}>Lap {i + 1} <span className='lapTime'>{lapMinutes}:{lapSeconds}.{lapMilliseconds}</span></p><hr /></div>
    )
  })

  return (
    <IonApp>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <h1>Lap Timer</h1>
              <h1>{minutes}:{seconds}.{milliseconds}</h1>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton onClick={() => setTimerRunning(true)}>Start</IonButton>
            <IonButton onClick={() => setTimerRunning(false)}>Stop</IonButton>
            <IonButton onClick={onLap}>Lap</IonButton>
            <IonButton onClick={onReset}>Reset</IonButton>
            <IonText><hr />{showLaps}</IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonApp>
  );
}

export default App;
