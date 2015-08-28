describe("deleteBlockTop should", function() {
    var configuration = { 
                        };
});

it("should receive a successful response", function() {
    spyOn($, "ajax").andCallFake(function(e) {
        e.success({});
    });
 
    // var callbacks = {
    //     checkForInformation: jasmine.createSpy(),
    //     displayErrorMessage: jasmine.createSpy(),
    // };
 
    deleteBlockTop( configuration);
    // expect(callbacks.checkForInformation).toHaveBeenCalled();  //Verifies this was called
    // expect(callbacks.displayErrorMessage).not.toHaveBeenCalled();  //Verifies this was NOT called
});
