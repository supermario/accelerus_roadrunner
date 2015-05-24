//Get report data

// ,,AT1,AT2,AT2-Code,AT3,,AVENGREA_1,AVENGSPL_1,AVENGWRI_1,AVWKHA1,AVWKHB1,AVWKHC1
student_rows = [
  'derping',
  'herping',
  'okiedokie'
]


check_student_names = function(student_rows) {
  student_rows.map(function(row) {
    var element = get_student_element(row);
    if (element.length !== 0) {
      //console.log('Student ok...')
    } else {
      console.log(row.split(',')[0])
    }
  })
}

get_student_element = function(row) {
  columns = row.split(',')
  full_name = columns[0]
  at1_mark = columns[2]

  first_name = full_name.split(' ')[0]
  last_name = full_name.split(' ')[1]

  click_name = last_name + ", " + first_name

  //  - click student name
  return $('.navigationTreeViewPanel .keyInfo:contains("' + click_name + '")')
}


click_student_name = function(row) {
  get_student_element(row).trigger('click')

  return delay(1000, row)
}

click_on_english = function(row) {
  //  - click subject 'english'
  $('.enrolmentsPanel').find('td:contains("English")').trigger('click')

  return delay(1000, row)
}

mark_inserter = function(column, name, timeout) {
  return function(row) {
    var columns = row.split(',')
    // The mark, without any '+' or '-' characters
    var mark = columns[column].replace(/[\+-]/g, '')

    console.log(name+':'+mark)

    //  - find label AT1
    var label = $('.nonCommentResults .itemCode:contains("'+name+'")')
    //  - find the parent class non comment item
    var parent = label.parents('.nonCommentItem')
    //  - find input
    var input = parent.find('input')

    //  - Enter essay score into AT1 field
    var char_code = mark.charCodeAt(0);

    input
      .val(mark)
      .trigger ({ type: 'keypress', keyCode: char_code, which: char_code, charCode: char_code })
      .blur()

    return delay(timeout, row)
  }
}

// ,,AT1,AT2,AT2-Code,AT3,,AVENGREA_1,AVENGSPL_1,AVENGWRI_1,AVWKHA1,AVWKHB1,AVWKHC1
at1_score       = mark_inserter(2, 'AT1', 100)
at2_score       = mark_inserter(4, 'AT2', 100)
at3_score       = mark_inserter(5, 'AT3', 100)
reading_score   = mark_inserter(7, 'AVENGREA_1', 100)
speaking_score  = mark_inserter(8, 'AVENGSPL_1', 100)
writing_score   = mark_inserter(9, 'AVENGWRI_1', 100)
effort_score    = mark_inserter(10, 'AVWKHA1', 100)
behaviour_score = mark_inserter(11, 'AVWKHB1', 100)
attitude_score  = mark_inserter(12, 'AVWKHC1', 4000)

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

  console.log("Processing: " + student)

  click_student_name(student)
    .then(click_on_english)
    .then(at1_score)
    .then(at2_score)
    .then(at3_score)
    .then(reading_score)
    .then(speaking_score)
    .then(writing_score)
    .then(effort_score)
    .then(behaviour_score)
    .then(attitude_score)
    .then(next_student(i));
}

process_loop(student_rows.length)
