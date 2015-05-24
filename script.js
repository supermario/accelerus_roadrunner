//Get report data

student_rows = []

//For each student:

// student_rows.map(function(row){
//   process_student(row)
// });



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
}

click_on_english = function() {
  //  - click subject 'english'
  $('.enrolmentsPanel').find('td:contains("English")').trigger('click')
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
}
























process_student = function(row) {
  columns = row.split(',')
  full_name = columns[0]
  at1_mark = columns[2]

  first_name = full_name.split(' ')[0]
  last_name = full_name.split(' ')[1]

  click_name = last_name + ", " + first_name

  //  - click student name
  student_element = $('.navigationTreeViewPanel .keyInfo:contains("' + click_name + '")')
  student_element.trigger('click')

  //  - click subject 'english'
  $('.enrolmentsPanel').find('td:contains("English")').trigger('click')

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

}
