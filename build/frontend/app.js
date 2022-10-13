$(() => {
    $('#backward').on('click', () => $.post('/control/prevtrack'));
    $('#rewind').on('click', () => $.post('/control/left'));
    $('#playpause').on('click', () => $.post('/control/playpause'));
    $('#skip').on('click', () => $.post('/control/right'));
    $('#forward').on('click', () => $.post('/control/nexttrack'));
});