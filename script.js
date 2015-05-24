//Get report data

student_rows = [
  'derping',
  'herping',
  'okiedokie'
]

click_student_name = function(row) {
  columns = row.split(',')
  full_name = columns[0]
  at1_mark = columns[2]

  first_name = full_name.split(' ')[0]
  last_name = full_name.split(' ')[1]

  click_name = last_name + ", " + first_name

  //  - click student name
  student_element = $('.navigationTreeViewPanel .keyInfo:contains("' + click_name + '")')
  student_element.trigger('click')

  return delay(1000, row)
}

click_on_english = function(row) {
  //  - click subject 'english'
  $('.enrolmentsPanel').find('td:contains("English")').trigger('click')

  return delay(1000, row)
}

enter_at1_score = function(row) {
  columns = row.split(',')
  at1_mark = columns[2]

  //  - find label AT1
  at1_label = $('.itemCode:contains("AT1")')
  //  - find the parent class non comment item
  at1_parent = at1_label.parents('.nonCommentItem')
  //  - find input
  at1_input = at1_parent.find('input')

  //  - Enter essay score into AT1 field
  char_code = at1_mark.charCodeAt(0);

  at1_input
    .trigger ({ type: 'keypress', keyCode: char_code, which: char_code, charCode: char_code })
    .val(at1_mark[0])
    .blur()

  return delay(4000, row)
}

function next_student(i) {
  function() {
    if (--i) {
      process_loop(i)
    } else {
      alert('Processing finished!')
    }
  }
}

function delay(time, value) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() { resolve(value) }, time)
  })
}

function process_loop(i) {
  student = student_rows[i-1]

  click_student_name(student)
    .then(click_on_english)
    .then(enter_at1_score)
    .then(next_student(i));
}

process_loop(student_rows.length)

