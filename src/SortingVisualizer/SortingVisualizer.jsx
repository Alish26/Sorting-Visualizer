import React from 'react';
import './SortingVisualizer.css';
import '../SortingAlgorithms/MergeSort'
import { getMergeSortAnimation } from '../SortingAlgorithms/MergeSort';
import { getBubbleSortAnimation } from '../SortingAlgorithms/BubbleSort';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: []
        };
        this.disable = false; 
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const arr = [];
        for(let i = 0; i < 150; i++){
            arr.push(randomIntFromInterval(5, 520));
        }
        this.setState({array: arr});
    }

    MergeSort(){
        const arr = this.state.array;
        let animations = getMergeSortAnimation(arr);
        const arrayBar = document.getElementsByClassName('array-bar');
        for(let i = 0; i < animations.length; i++){
            const isChangeColor = i % 3 !== 2;
            if(isChangeColor){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBar[barOneIdx].style;
                const barTwoStyle = arrayBar[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 3)
            }else{
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBar[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 3)
            }
        }
    }

    QuickSort(){}

    BubbleSort(){
        const array = this.state.array;
        const arrayBar = document.getElementsByClassName('array-bar');
        const animations = getBubbleSortAnimation(array);
        for(let i = 0, cnt = 0; i < animations.length; i++){
            const isChangeColor = animations[i].length === 2;
            if(isChangeColor){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBar[barOneIdx].style;
                const barTwoStyle = arrayBar[barTwoIdx].style;
                const color = cnt % 2 === 0 ? 'red' : 'turquoise';
                cnt += 1;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i - 1);
            }else{
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBar[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i - 1)
            }
        }
    }

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
                <button  onClick={() => this.resetArray()}>Generate New Array</button>
                <button  onClick={() => this.MergeSort()}>Merge Sort</button>
                <button  onClick={() => this.QuickSort()}> Quick Sort</button>
                <button  onClick={() => this.BubbleSort()}>Bubble Sort</button>
                <button  onClick={() => this.HeapSort()}>Heap Sort</button>
            </div>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}