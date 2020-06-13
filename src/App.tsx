import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as ml5 from "ml5";
const App: React.FC = (props) => {

  function imageLoaded(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files === null) return;
    let fil = event.target.files[0];
    var reader = new FileReader();
    var imgtag = document.getElementById("imageHere");
    if (imgtag === null) return;
    let aaa: string = "<img src=\"" + URL.createObjectURL(fil) + "\" id=\"img\"></img>"
    imgtag.innerHTML = aaa;

    if (imgtag === null) return;

    let modelURL = 'https://storage.googleapis.com/tm-model/9y6qV1Elr/'; // coloca o link da sua model aqui
    var img = document.getElementById("img");

    ml5.imageClassifier(modelURL + 'model.json').then(//ml5 é a lib que faz a comunicação com o modelo; Esse then é algo que pega quando uma promisse acaba e continua o trabalho a partir de lá
      //btw, promisse é tipo uma função que fala "ah, to fazendo aqui o que vc pediu, mas pode continuar o código que quando terminar eu aviso"
      (classifier: { classify: (arg0: any, arg1: any) => void; }) => {
        classifier.classify(img, gotResults);//aqui ele está classificando com o modelo que vc deu e retroirnando para a função gotResults
      }
    )

    function gotResults(error, results) {
      if (error) { //Aqui ele vai mostrar o erro no console
        console.error(error);
        return;
      }
      let label = results[0].label;
      console.log(label);
      let confidence = results[0].confidence;
      let div = document.getElementById("result");
      if (div === null) return;
      div.innerHTML = "label: " + label + "<br/> confidence: " + Math.round(confidence * 100) + "%"
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ border: "solid", borderColor: "black", height: 100, width: 100 }}>
          <input type="file" onChange={imageLoaded} />
          <br />
        </div>

        <div id="imageHere"></div>
        <div id="result"></div>
        <div id="webcam-container"></div>
        <div id="label-container"></div>
      </header>
    </div>
  );
}



export default App;
