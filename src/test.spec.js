function getLastHistoryItem(el, historyKey){
  return el.__elementHistory[historyKey][0]
}

describe("A suite", function() {
  it("It tracks setAttribute calls", function specFunctionName() {
    var el = document.createElement('div')
    el.setAttribute('style', 'background: red')
    var lastHistoryItem = getLastHistoryItem(el, 'style')
    expect(lastHistoryItem.actionType).toEqual('setAttribute call')
    expect(lastHistoryItem.actionArguments).toEqual(['style', 'background: red'])
    expect(lastHistoryItem.oldValue).toEqual(null)
    expect(lastHistoryItem.newValue).toEqual('background: red')
    expect(lastHistoryItem.callstack).toContain('specFunctionName')
    expect(lastHistoryItem.date).not.toBe(undefined)
  });
  it("Tracks className assignments", function(){
    var el = document.createElement('div')
    el.className += 'cake'
    var lastHistoryItem = getLastHistoryItem(el, 'className')
    expect(lastHistoryItem.actionType).toEqual('className assignment')
    expect(lastHistoryItem.actionArguments).toEqual(['cake'])
    expect(lastHistoryItem.oldValue).toEqual('')
    expect(lastHistoryItem.newValue).toEqual('cake')
  })
  it("Track classList.add calls", function(){
    var el = document.createElement('div')
    el.classList.add('cake')
    var lastHistoryItem = getLastHistoryItem(el, 'className')
    expect(lastHistoryItem.actionType).toEqual('classList.add call')
    expect(lastHistoryItem.actionArguments).toEqual(['cake'])
    expect(lastHistoryItem.oldValue).toEqual('')
    expect(lastHistoryItem.newValue).toEqual('cake')
  })

  it("Tracks class assignments when creating element by assigning to innerHTML", function(){
    var parentEl = document.createElement('div')
    parentEl.innerHTML = '<div class="cake"></div>'
    var el = parentEl.children[0]
    var lastHistoryItem = getLastHistoryItem(el, 'className')
    expect(lastHistoryItem.actionType).toEqual('innerHTML assignment on parent')
    expect(lastHistoryItem.actionArguments).toEqual([parentEl, '<div class="cake"></div>'])
    expect(lastHistoryItem.oldValue).toEqual(null)
    expect(lastHistoryItem.newValue).toEqual('cake')
  })

  describe("jQuery", function(){
    it("Detects where minHeight style was set", function(){
      var el = document.createElement("div")
      $(el).css("min-height", "20px"); // equivalent to el.style.minHeight = "20px"
      var lastHistoryItem = getLastHistoryItem(el, 'style')
      expect(lastHistoryItem.newValue).toBe("min-height: 20px;")
    })
  })

  // todo: make sure classlist and .setAttribute(class) are also tracked under className
});