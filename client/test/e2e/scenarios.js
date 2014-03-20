describe('Pipe and media loader', function () {
  it('should show a list with results depended on what pipe is selected', function () {
    browser().navigateTo('../../app/#/');
    expect(repeater('#disciplinesList li').count()).toEqual(2);
    element('#disciplinesList li:eq(1) a').click(); //<-- User selects ventilation
    select('selectedPipe').option('Galvanized steel');
    element('#tableTab a').click(); //<-- User selects ventilation
    expect(repeater('tbody tr', 'Results list').column('result.size')).
      toEqual(["100", "125", "160", "200", "250", "315", "400", "500", "630", "800", "1000"]);
    expect(repeater('tbody tr').count()).toBeGreaterThan(5);
  });
});

