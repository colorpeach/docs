describe("A suite of basic functions", function() {
    it("reverse word",function(){
        expect("DCBA").toEqual(reverse("ABCD"));
    });
    it("reverse word another",function(){
        expect("Conan").toEqual(reverse("nanoC"));
    });
});
