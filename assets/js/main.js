$(function () {
  $(".menu-toggle").on("click", function () {
    $(".mobile-menu").css({ display: "flex" });
  });
  $(".close-menu").on("click", function () {
    $(".mobile-menu").css({ display: "none" });
  });
  $(".mobile-menu ul li a").on("click", function () {
    $(".mobile-menu").css({ display: "none" });
  });
  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 10,
    autoWidth: false,
    nav: true,
    items: 5,
    center: true,
    navText: [
      "<img class='chevron' src='assets/img/left.svg' alt='left' />",
      "<img class='chevron' src='assets/img/right.svg' alt='right' />",
    ],
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 5,
      },
    },
  });
  $('.menu li a[href^="#"]').on("click", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top,
      },
      500
    );
  });
});

const API_URL = 'https://api.kommunity.com/api/v3/goturkiye/events/gophercon-turkey-1c8eab1d'
const API_TICKETS_URL = 'https://api.kommunity.com/api/v1/tickets?event_id=2e8bca4e-5d18-49ca-809f-322383121a98'

var App = new Vue({
    el: '#app',
    data: {
        days: [],
        speakers: [],
        sessions: [],
        tickets: [],
        sponsors: [],
        turkishTracks: [{
          start: 0,
          end: 0,
          title: '',
          speakerName: '',
          avatar: ''
        }],
        englishTracks: [{
          start: 0,
          end: 0,
          title: '',
          speakerName: '',
          avatar: ''
        }]
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData: function () {
            axios.get(API_URL).then(response => {
                  this.speakers = response.data.data.speakers;

                  this.sponsors = response.data.data.sponsors;

                  const tracks = response.data.data.schedule[0].tracks;

                  this.englishTracks = tracks[0].sessions.map(session => ({
                    start: session.start,
                    end: session.end,
                    title: session.talks[0].title,
                    speakerName: _.filter(this.speakers, _.matches({ 'slug': session.talks[0].speakers[0] }))[0].name,
                    avatar: _.filter(this.speakers, _.matches({ 'slug': session.talks[0].speakers[0] }))[0].avatar,
                  }));
                  
                  this.turkishTracks = tracks[1].sessions.map(session => ({
                    start: session.start,
                    end: session.end,
                    title: session.talks[0].title,
                    speakerName: _.filter(this.speakers, _.matches({ 'slug': session.talks[0].speakers[0] }))[0]?.name,
                    avatar: _.filter(this.speakers, _.matches({ 'slug': session.talks[0].speakers[0] }))[0]?.avatar,
                  }));
                }
            );



            axios.get(API_TICKETS_URL).then(response => {
              console.log(response.data.data)
              this.tickets = _.chain(response.data.data).toPairs().sortBy(0).take(3).fromPairs().value()
            }
        );
        },
    } 
});