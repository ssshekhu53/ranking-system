let sno=1;

$(document).ready(function() {
    $('#lottery-form #form-container').append(participantBoxTemplate(sno++));
});

$(document).on('click', '.addBtn', function() {
    $('#lottery-form #form-container').append(participantBoxTemplate(sno++));
    $('#lottery-form .participant-box:nth-last-child(1) input[name="name[]"]').focus();
    $('.removeBtn').attr('disabled', false);
});

$(document).on('click', '.removeBtn', function() {
    $($(this).attr('aria-boxid')).remove();
    changeSerialNo('#lottery-form #form-container .participant-box');
    sno--;
    if(sno<=2) 
        $('.removeBtn').attr('disabled', true);
});

$(document).on('submit', '#lottery-form', function() {
    var participants=$('#lottery-form .participant-box').map(function() { return {name: $(this).find('input[name="name[]"]').val(), roll: $(this).find('input[name="roll[]"]').val()}; })
    var len=participants.length;
    var index=Math.floor(Math.random()*(len-1));

    console.log(participants);
    console.log(participants[index]);

    Swal.fire({
        imageUrl: 'assets/img/swal_icon.png',
        imageHeight: '25vh',
        title: 'Congo',
        html: `<strong>${participants[index].name.toUpperCase()} (Roll. ${participants[index].roll})</strong> is the winner! Your fee will be paid by your classmates.`,
        backdrop: 'rgba(0, 0, 0, 0.5) url(assets/img/party2.gif) repeat'
    });
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
                            <input type="text" class="form-control name-input" name="name[]" aria-describedby="name${sno}" required />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark bg-opacity-75 text-white fw-bold justify-content-center roll-label" id="roll${sno}">Roll</span>
                            <input type="text" class="form-control roll-input" name="roll[]" aria-describedby="roll${sno}" required />
                        </div>
                    </div>
                </div>
                <div class="btn-group w-100">
                    <button type="button" class="btn btn-primary fw-bold addBtn">Add More</button>
                    <button type="button" class="btn btn-outline-secondary fw-bold removeBtn" aria-boxid="#participant-box-${sno}" disabled>Remove</button>
                </div>
            </div>`;
}