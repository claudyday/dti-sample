
(function() {
  "use strict";
 
/*
* Date
*/
const date = new Date();

const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};

let text = date.toLocaleString('en-PH', options);
document.getElementById("date").innerHTML = text;


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("shrink-nav").style.padding = "55px 130px";
    document.getElementById("shrink-nav").style.height = "25%";
    document.getElementById("logo-master").style.width = "60%";
    document.getElementById("seal").style.height = "40px";
    document.getElementById("foi").style.height = "40px";
    document.getElementById("pst").style.fontSize = "12px";
    document.getElementById("date").style.fontSize = "12px";
  } else {
    document.getElementById("shrink-nav").style.padding = "60px 135px";
    document.getElementById("shrink-nav").style.height = "32%";
    document.getElementById("logo-master").style.width = "100%";
    document.getElementById("seal").style.height = "60px";
    document.getElementById("foi").style.height = "60px";
    document.getElementById("pst").style.fontSize = "15px";
    document.getElementById("date").style.fontSize = "15px";
  }
}

  /**
   * Navbar links active state on scroll
   */
  // let navbarlinks = select('#navbar .scrollto', true)
  // const navbarlinksActive = () => {
  //   let position = window.scrollY + 200
  //   navbarlinks.forEach(navbarlink => {
  //     if (!navbarlink.hash) return
  //     let section = select(navbarlink.hash)
  //     if (!section) return
  //     if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
  //       navbarlink.classList.add('active')
  //     } else {
  //       navbarlink.classList.remove('active')
  //     }
  //   })
  // }
  // window.addEventListener('load', navbarlinksActive)
  // onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
   on('click', '.mobile-nav-toggle', function(e) {
     select('#navbar').classList.toggle('navbar-mobile')
     this.classList.toggle('bi-list')
     this.classList.toggle('bi-x')
   })

  /**
   * Mobile nav dropdowns activate
   */
   on('click', '.navbar .dropdown > a', function(e) {
     if (select('#navbar').classList.contains('navbar-mobile')) {
       e.preventDefault()
       this.nextElementSibling.classList.toggle('dropdown-active')
     }
   }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
  */
 on('click', '.scrollto', function(e) {
   if (select(this.hash)) {
     e.preventDefault()

     let navbar = select('#navbar')
     if (navbar.classList.contains('navbar-mobile')) {
       navbar.classList.remove('navbar-mobile')
       let navbarToggle = select('.mobile-nav-toggle')
       navbarToggle.classList.toggle('bi-list')
       navbarToggle.classList.toggle('bi-x')
     }
     scrollto(this.hash)
   }
 }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Tab Pills for News
   */

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()


//Database Connection
// const sqlite = require('sqlite').verbose();

// let db = new sqlite3.Database('./assets/database/dti-sample.db', sqlite3.OPEN_READWRITE, (err) => {
//   if(err) {
//     console.log(err.message);
//   }
//   console.log('Connection established.');
// });

// db.serialize(() => {
//   db.each('SELECT optradio as answer, comments as comments FROM Feedback', (err, row) => {
//     if (err) {
//     console.log(err,message);
//     }
//     console.log(err,message);
//   });
// })

//Declaration
// var createStatement = "CREATE TABLE IF NOT EXISTS Feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, answers TEXT, comments TEXT)";
// var selectAllStatement = "SELECT * FROM Feedback";
// var insertStatement = "INSERT INTO Feedback (answers, comments) VALUES (?, ?)";
// var updateStatement = "UPDATE Feedback SET answers = ?, comments = ? WHERE id=?";
// var deleteStatement = "DELETE FROM Feedback WHERE id=?";
// var dropStatement = "DROP TABLE Feedback";
 
// //Connection
//  var db = openDatabase("dti-sample", "1.0", "dti-sample", 200000);  // Open SQLite Database
 
// var dataset;
 
// var DataType;

// function createTable()  // Function for Create Table in SQLite.
// {
//   db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
// }
 
// function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
// {
//   var answerstemp = $('input:text[id=answers]').val();
//   var commentstemp = $('input:text[id=comments]').val();
//   db.transaction(function (tx) { tx.executeSql(insertStatement, [answerstemp, commentstemp], loadAndReset, onError); });
//   //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
// }
 
// function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
// {
//   var iddelete = id.toString();
//   db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
//   resetForm();
 
// }
 
// function updateRecord() // Get id of record . Function Call when Delete Button Click..
// {
//   var answersupdate = $('input:text[id=answers]').val().toString();
//   var commentsupdate = $('input:text[id=comments]').val().toString();
//   var useridupdate = $("#id").val();
//   db.transaction(function (tx) { tx.executeSql(updateStatement, [answersupdate, commentsupdate, Number(idupdate)], loadAndReset, onError); });
// }
 
// function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
// {
//   db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
//   resetForm();
//   initDatabase();
// }
 
// function loadRecord(i) // Function for display records which are retrived from database.
// {
//   var item = dataset.item(i);
//   $("#answers").val((item['answers']).toString());
//   $("#comments").val((item['comments']).toString());
//   $("#id").val((item['id']).toString());
// }
 
// function resetForm() // Function for reset form input values.
// {
//   $("#answers").val("");
//   $("#comments").val("");
//   $("#id").val("");
// }
 
// function loadAndReset() //Function for Load and Reset...
// {
//     resetForm();
//     showRecords()
// }
 
// function onError(tx, error) // Function for Hendeling Error...
// {
//     alert(error.message);
// }
 
// function showRecords() // Function For Retrive data from Database Display records as list
// {
//     $("#report").html('')
//     db.transaction(function (tx) {
//         tx.executeSql(selectAllStatement, [], function (tx, result) {
//             dataset = result.rows;

//             for (var i = 0, item = null; i < dataset.length; i++) {
//                 item = dataset.item(i);
//                 var linkeditdelete = '<li>' + item['answers'] + ' , ' + item['comments'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +
//                                             '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';
 
//                 $("#report").append(linkeditdelete);
 
//             }
 
//         });
 
//     });
 
// }
 
// $(document).ready(function () // Call function when page is ready for load..
// {
// ;
//     $("body").fadeIn(2000); // Fede In Effect when Page Load..
 
//     initDatabase();
 
//     $("#submitButton").click(insertRecord);  // Register Event Listener when button click.
 
//     $("#btnUpdate").click(updateRecord);
 
//     $("#btnReset").click(resetForm);
 
//     $("#btnDrop").click(dropTable);
 
// });

//Form Submit
