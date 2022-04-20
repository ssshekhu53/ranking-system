let sno=1;

$(document).ready(function() {
    $('#student-list-form #form-container').append(studentBoxTemplate(sno++));
});

$(document).on('click', '.addBtn', function() {
    $('#student-list-form #form-container').append(studentBoxTemplate(sno++));
    $('#student-list-form .student-box:nth-last-child(1) input[name="regno[]"]').focus();
    $('.removeBtn').attr('disabled', false);
});

$(document).on('click', '.removeBtn', function() {
    $($(this).attr('aria-boxid')).remove();
    changeSerialNo('#student-list-form #form-container .student-box');
    sno--;
    if(sno<=2) 
        $('.removeBtn').attr('disabled', true);
});

$(document).on('keypress', '#student-list-form', function(e) {
    var key=e.charCode || e.keyCode || 0; 
    if(key==13) {
        e.preventDefault();
        $('#student-list-form .student-box:nth-last-child(1) .addBtn').click();
    } 
});

$(document).on('submit', '#student-list-form', function(e) {
    e.preventDefault();
    var students=$('#student-list-form .student-box').map(function() { return {regno: $(this).find('input[name="regno[]"]').val(), name: $(this).find('input[name="name[]"]').val(), marks: $(this).find('input[name="marks[]"]').val(), cgpa: $(this).find('input[name="cgpa[]"]').val()}; })
    var len=students.length;
    var index=Math.floor(Math.random()*len);

    students.sort((a, b) => { return b.marks-a.marks; });
    console.log(students);
    console.log(students[index]);

    var table="";
    var sno=1;
    for(var ele of Object.entries(students)) {
        console.log(ele);
        if(!isNaN(ele[0]))
            table+=tableTemplate(sno++, ele[1]);
    };
    $('table tbody').html(table);
    
});

$(document).on('click', '#print-btn', function() {
    $('table').print();
});

function changeSerialNo(selector) {
    let tempSno=1;
    $(selector).each(function() {
        $(this).attr('id', `student-box-${tempSno}`);
        $(this).find('.box-label').text(`Student ${tempSno}`);
        $(this).find('.regno-label').attr('id', `regno${tempSno}`);
        $(this).find('.regno-input').attr('id', `aria-describedby${tempSno}`);
        $(this).find('.name-label').attr('id', `name${tempSno}`);
        $(this).find('.name-input').attr('id', `aria-describedby${tempSno}`);
        $(this).find('.marks-label').attr('id', `marks${tempSno}`);
        $(this).find('.marks-input').attr('id', `aria-describedby${tempSno}`);
        $(this).find('.cgpa-label').attr('id', `cgpa${tempSno}`);
        $(this).find('.cgpa-input').attr('id', `aria-describedby${tempSno}`);
        $(this).find('.removeBtn').attr('aria-boxid', `#student-box-${tempSno}`);
        tempSno++;
    });
}

function studentBoxTemplate(sno) {
    return `<div class="student-box border border-1 border-dark px-4 py-3 mb-3" id="student-box-${sno}">
                <label class="fw-bold h5 text-muted mb-0 pb-0 box-label">Student ${sno}</label>
                <hr class="mt-0" />
                <div class="row">
                    <div class="col-sm-6">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark bg-opacity-75 text-white fw-bold justify-content-center regno-label" id="regno${sno}">Reg. No.</span>
                            <input type="text" class="form-control regno-input" name="regno[]" aria-describedby="regno${sno}" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark bg-opacity-75 text-white fw-bold justify-content-center name-label" id="name${sno}">Name</span>
                            <input type="text" class="form-control name-input" name="name[]" aria-describedby="name${sno}" required />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark bg-opacity-75 text-white fw-bold justify-content-center marks-label" id="marks${sno}">Marks (%)</span>
                            <input type="text" class="form-control marks-input" name="marks[]" aria-describedby="marks${sno}" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark bg-opacity-75 text-white fw-bold justify-content-center cgpa-label" id="cgpa${sno}">CGPA</span>
                            <input type="text" class="form-control cgpa-input" name="cgpa[]" aria-describedby="cgpa${sno}" />
                        </div>
                    </div>
                </div>
                <div class="btn-group w-100">
                    <button type="button" class="btn btn-primary fw-bold addBtn">Add More</button>
                    <button type="button" class="btn btn-outline-secondary fw-bold removeBtn" aria-boxid="#student-box-${sno}" disabled>Remove</button>
                </div>
            </div>`;
}

function tableTemplate(sno, data) {
    return `<tr class="text-center">
                <td>${sno}</td>
                <td>${data.regno}</td>
                <td>${data.name}</td>
                <td>${data.marks}</td>
                <td>${data.cgpa}</td>
            </tr>`;
}