//Get report data

// ,,AT1,AT2,AT2-Code,AT3,AT4,AVENGREA_1,AVENGSPL_1,AVENGWRI_1,AVWKHA1,AVWKHB1,AVWKHC1,AVACH1,AVAFI1
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

wordbank_inserter = function(column, name, timeout) {
  return function(row) {
    var columns = row.split(',')
    var word_keys = columns[column].split('.')

    var words = wordbank_map(word_keys).join("\n")

    //  - find label
    var label = $('.commentResults .itemCode:contains("'+name+'")')
    //  - find the parent class non comment item
    var parent = label.parents('.commentItem')
    //  - find input
    var input = parent.find('textarea')

    //  - Enter essay score into field
    var char_code = words.charCodeAt(0);

    input
      .val(words)
      .trigger ({ type: 'keypress', keyCode: char_code, which: char_code, charCode: char_code })
      .blur()

    return delay(timeout, row)
  }
}

wordbank_inserter_should = function(column, name, timeout) {
  return function(row) {
    var columns = row.split(',')
    var word_keys = columns[column].split('.')

    var mapped_shoulds = $.unique(wordbank_shoulds_map(word_keys))

    var words = wordbank_map(mapped_shoulds).join("\n")

    //  - find label
    var label = $('.commentResults .itemCode:contains("'+name+'")')
    //  - find the parent class non comment item
    var parent = label.parents('.commentItem')
    //  - find input
    var input = parent.find('textarea')

    //  - Enter essay score into field
    var char_code = words.charCodeAt(0);

    input
      .val(words)
      .trigger ({ type: 'keypress', keyCode: char_code, which: char_code, charCode: char_code })
      .blur()

    return delay(timeout, row)
  }
}

wordbank_map = function(word_keys) {
  bank = {
    '1': "",
    '2': "",
    '3': "",
    '4': "",
    '5': "",
    '6': "",
    '7': "",
    '8': "",
    '9': "",
    '10': "",
    '11': "",
    '12': "",
    '13': "",
    '14': "."
  }

  return word_keys.map(function(word_key){
    return bank[word_key]
  })
}

wordbank_shoulds_map = function(word_keys) {
  shoulds_for = {
    '1':  '7',
    '2':  '9',
    '3':  '6',
    '4':  '5',
    '5':  '10',
    '6':  '11',
    '7':  '11',
    '8':  '14',
    '9':  '13',
    '10': '13',
    '11': '13',
    '12': '13',
    '13': '',
    '14': ''
  }

  return word_keys.map(function(word_key){
    return shoulds_for[word_key]
  })
}

// ,,AT1,AT2,AT2-Code,AT3,AT4,AVENGREA_1,AVENGSPL_1,AVENGWRI_1,AVWKHA1,AVWKHB1,AVWKHC1,AVACH1,AVAFI1
at1_score       = mark_inserter(2, 'AT1', 100)
at2_score       = mark_inserter(4, 'AT2', 100)
at3_score       = mark_inserter(5, 'AT3', 100)
exam            = mark_inserter(6, 'AT4', 100)
reading_score   = mark_inserter(7, 'AVENGREA_1', 100)
speaking_score  = mark_inserter(8, 'AVENGSPL_1', 100)
writing_score   = mark_inserter(9, 'AVENGWRI_1', 100)
effort_score    = mark_inserter(10, 'AVWKHA1', 100)
behaviour_score = mark_inserter(11, 'AVWKHB1', 100)
attitude_score  = mark_inserter(12, 'AVWKHC1', 100)
comment_can     = wordbank_inserter(13, 'AVACH1', 100)
comment_should  = wordbank_inserter_should(13, 'AVAFI1', 4000)

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
    .then(exam)
    .then(reading_score)
    .then(speaking_score)
    .then(writing_score)
    .then(effort_score)
    .then(behaviour_score)
    .then(attitude_score)
    .then(comment_can)
    .then(comment_should)
    .then(next_student(i));
}

process_loop(student_rows.length)
