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

mark_inserter = function(column, label, timeout) {
  return function(row) {
    columns = row.split(',')
    mark = columns[column]

    //  - find label AT1
    label = $('.itemCode:contains("'+label+'")')
    //  - find the parent class non comment item
    parent = label.parents('.nonCommentItem')
    //  - find input
    input = parent.find('input')

    //  - Enter essay score into AT1 field
    char_code = mark.charCodeAt(0);

    input
      .val(mark[0])
      .trigger ({ type: 'keypress', keyCode: char_code, which: char_code, charCode: char_code })
      .blur()

    return delay(timeout, row)
  }
}

enter_at1_score = mark_inserter(2, 'AT1', 1000)
enter_at3_score = mark_inserter(4, 'AT3', 4000)


function next_student(i) {
  return function() {
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
    .then(enter_at3_score)
    .then(next_student(i));
}

process_loop(student_rows.length)
