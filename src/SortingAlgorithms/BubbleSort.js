export function getBubbleSortAnimation(array) {
    const animations = [];
    if(array.length < 2) return array;
    BubbleSort(array, animations)
    return animations;
}

function BubbleSort(array, animations) {
    let sorted = false;
    while(!sorted) {
        sorted = true;
        for(let i = 0; i < array.length - 1; i++) {
             for(let j = 0; j < array.length - 1 - i; j++){
                if(array[j] > array[j + 1]) {
                    animations.push([j, j + 1]);
                    animations.push([j, j + 1]);
                    animations.push([j, array[j + 1], true]);
                    animations.push([j + 1, array[j], true]);
                    const tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                    sorted = false;
                }
             }
             if(sorted) break;
        }
    }
}