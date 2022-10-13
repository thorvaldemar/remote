$(() => {
    $('#power').on('click', () => $.post('/system/shutdown'));
    $('#tab').on('click', () => {
        $.post('/tab/start');
        $('.layer').show();
    });

    $('#backward').on('click', () => $.post('/control/prevtrack'));
    $('#rewind').on('click', () => $.post('/control/left'));
    $('#playpause').on('click', () => $.post('/control/playpause'));
    $('#skip').on('click', () => $.post('/control/right'));
    $('#forward').on('click', () => $.post('/control/nexttrack'));

    $('#accept').on('click', () => {
        $.post('/tab/stop');
        $('.layer').hide();
    });

    $('#up').on('click', () => $.post('/control/up'));
    $('#left').on('click', () => $.post('/control/left'));
    $('#down').on('click', () => $.post('/control/down'));
    $('#right').on('click', () => $.post('/control/right'));
});