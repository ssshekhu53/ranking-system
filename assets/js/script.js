$(document).on('submit', 'form#evaluator-form', function(e) {
    e.preventDefault();
    let expression=$(this).find('input[name="expr"]').val();
    if(expression.length!==0)
        $(this).find('input[name="result"]').val(eval(expression));
});

$(document).on('keypress', 'form#evaluator-form input[name="expr"]', function(e) {
    e.preventDefault();
    if(expressionValidator(String.fromCharCode(e.keyCode)))
        e.target.value=e.target.value+String.fromCharCode(e.keyCode);
    else
        e.target.value=e.target.value;
});

$(document).on('keypress', 'form#calculator-form input[name="num[]"]', function(e) {
    e.preventDefault();
    if(valueValidator(String.fromCharCode(e.keyCode)))
        e.target.value=e.target.value+String.fromCharCode(e.keyCode);
    else
        e.target.value=e.target.value;
});

$(document).on('click', 'form#calculator-form #andBtn', function() {
    let num=$('form#calculator-form input[name="num[]"]').map(function() { return $(this).val() });
    if(num[0].length!==0 && num[1].length!==0) 
        $('form#calculator-form input[name="result"]').val(parseInt(num[0])&parseInt(num[1]));
});

$(document).on('click', 'form#calculator-form #orBtn', function() {
    let num=$('form#calculator-form input[name="num[]"]').map(function() { return $(this).val() });
    if(num[0].length!==0 && num[1].length!==0) 
        $('form#calculator-form input[name="result"]').val(parseInt(num[0])|parseInt(num[1]));
});

$(document).on('click', 'form#calculator-form #xorBtn', function() {
    let num=$('form#calculator-form input[name="num[]"]').map(function() { return $(this).val() });
    if(num[0].length!==0 && num[1].length!==0) 
        $('form#calculator-form input[name="result"]').val(parseInt(num[0])^parseInt(num[1]));
});

function expressionValidator(ch) {
    return ((parseInt(ch)>=0 && parseInt(ch)<=9) || ch=='&' || ch=='|' || ch=='^')
}

function valueValidator(ch) {
    return (parseInt(ch)>=0 && parseInt(ch)<=9);
}

let sno=1;

$(document).ready(function() {
    $('#lottery-form').append(participantBoxTemplate(sno++));
});

$(document).on('click', '.addBtn', function() {
    $('#lottery-form').append(participantBoxTemplate(sno++));
    $('.removeBtn').attr('disabled', false);
});

$(document).on('click', '.removeBtn', function() {
    $($(this).attr('aria-boxid')).remove();
    changeSerialNo('#lottery-form .participant-box');
    sno--;
    if(sno<=2) 
        $('.removeBtn').attr('disabled', true);
});

function changeSerialNo(selector) {
    let tempSno=1;
    $(selector).each(function() {
        $(this).attr('id', `participant-box-${tempSno}`);
        $(this).find('.box-label').text(`Participant ${tempSno}`);
        $(this).find('.name-label').attr('id', `name${tempSno}`);
        $(this).find('.name-input').attr('id', `aria-describedby${tempSno}`);
        $(this).find('.roll-label').attr('id', `name${tempSno}`);
        $(this).find('.roll-input').attr('id', `aria-describedby${tempSno}`);
        $(this).find('.removeBtn').attr('aria-boxid', `#participant-box-${tempSno}`);
        tempSno++;
    });
}

function participantBoxTemplate(sno) {
    return `<div class="participant-box border border-1 border-dark px-4 py-3 mb-3" id="participant-box-${sno}">
                <label class="fw-bold h5 text-muted mb-0 pb-0 box-label">Participant ${sno}</label>
                <hr class="mt-0" />
                <div class="row">
                    <div class="col-sm-8">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark bg-opacity-75 text-white fw-bold justify-content-center name-label" id="name${sno}">Name</span>
                            <input type="text" class="form-control name-input" name="name[]" aria-describedby="name${sno}" />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark bg-opacity-75 text-white fw-bold justify-content-center roll-label" id="roll${sno}">Roll</span>
                            <input type="text" class="form-control roll-input" name="roll[]" aria-describedby="roll${sno}" />
                        </div>
                    </div>
                </div>
                <div class="btn-group w-100">
                    <button type="button" class="btn btn-primary fw-bold addBtn">Add More</button>
                    <button type="button" class="btn btn-outline-secondary fw-bold removeBtn" aria-boxid="#participant-box-${sno}" disabled>Remove</button>
                </div>
            </div>`;
}