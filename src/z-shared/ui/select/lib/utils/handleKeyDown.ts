const prevOptionCodes = [ 'ArrowUp', 'KeyW', 'KeyA' ];
const nextOptionCodes = [ 'ArrowDown', 'KeyD', 'KeyS' ];

/**
 * Принимает code нажатой клавиши и возвращает следующее действие
 * (выбор следующей или предыдущей опции в меню селекта или бездействие)
 */
export const handleKeyDown = (keyCode: string) => {
    if (prevOptionCodes.includes(keyCode)) return 'prevKey';
    if (nextOptionCodes.includes(keyCode)) return 'nextKey';
    return null;
};
