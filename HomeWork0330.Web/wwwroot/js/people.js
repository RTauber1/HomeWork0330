$(() => {

    loadPeople();

    function loadPeople() {
        $.get('/people/getall', function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(person => {
                $("#people-table tbody").append(`
<tr>
    <td><button class="btn btn-primary btn-block edit" data-id=${person.id} data-first-name=${person.firstName} data-last-name=${person.lastName} data-age=${person.age}>Edit</button></td>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td><button class="btn btn-danger btn-block delete" data-id=${person.id}>Delete</button></td>
</tr>`);
            });
        });
    }

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();


        $.post('/people/addperson', { firstName, lastName, age }, function (person) {
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        });
    });
    $("#people-table").on('click', ".delete", function () {
        const btn = $(this);
        const id = btn.data('id');
        $.post('/people/delete', { id }, function () {
            console.log("y")
            loadPeople();
        });
    });
    $("#people-table").on('click', ".edit", function () {
        $(".modal").modal();
        const btn = $(this);
        const id = btn.data('id');
        const firstName = btn.data('first-name');
        const lastName = btn.data('last-name');
        const age = btn.data('age');
        $(".fn").val(firstName);
        $(".ln").val(lastName);
        $(".age").val(age);
        $(".id").val(id);
    });
    $(".modal").on('click', ".update", function () {
        const btn = $(this);
        console.log("yes");
        const firstName = $(".fn").val();
        const lastName = $(".ln").val();
        const age = $(".age").val();
        const id = $(".id").val();
        $.post('/people/EditPerson', { id, firstName, lastName, age }, function () {
            console.log(id, firstName, lastName, age)
            $(".modal").modal('hide');
            loadPeople();
        });
    });
});