import React, {useState} from 'react';
import './SortingVisualizer.css';
import '../SortingAlgorithms/MergeSort'
import { getMergeSortAnimation } from '../SortingAlgorithms/MergeSort';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            disabled: false
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const arr = [];
        for(let i = 0; i < 280; i++){
            arr.push(randomIntFromInterval(5, 520));
        }
        this.setState({array: arr});
    }

    MergeSort(){
        const arr = this.state.array;
        let animations = getMergeSortAnimation(arr);
        for(let i = 0; i < animations.length; i++){
            const arrayBar = document.getElementsByClassName('array-bar');
            const isChangeColor = i % 3 !== 2;
            if(isChangeColor){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBar[barOneIdx].style;
                const barTwoStyle = arrayBar[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    
                }, i * 2)
            }else{
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBar[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 2)
            }
        }
    }

    QuickSort(){}

    BubbleSort(){}

    HeapSort(){}

    render() {
        const array = this.state.array;
        return(
            <div className="container">
                <div class = "sort-array">
                {array.map((value, idx) => (
                    <div className="array-bar" 
                     key= {idx}
                     style = {{ height: `${value}px`}}
                     >
                    </div>
                ))}
                </div>
                <button class = "btn" onClick={() => this.resetArray()}>Generate New Array</button>
                <button class = "btn" onClick={() => this.MergeSort()}>Merge Sort</button>
                <button class = "btn" onClick={() => this.QuickSort()}> Quick Sort</button>
                <button class = "btn" onClick={() => this.BubbleSort()}>Bubble Sort</button>
                <button class = "btn" onClick={() => this.HeapSort()}>Heap Sort</button>
            </div>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
