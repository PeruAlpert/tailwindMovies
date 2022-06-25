var allMovies = [];
// nav
$('.nav-tab-menu li').animate({ opacity: '0', paddingTop: '500px' }, 500);
$(window).click(function () {
  console.log($('.nav-tab-menu').offset().left);
  if ($('.nav-tab-menu').offset().left == 0) {
    $('.nav-tab-menu li').animate({ opacity: '0', paddingTop: '500px' }, 500);
  }
});
$('#button_aside').click(function () {
  if ($('.nav-tab-menu').offset().left < 0) {
    $('.nav-tab-menu').addClass('open-menu'),
      $('.nav-tab-menu .nav-item1').animate(
        { opacity: '1', paddingTop: '25px' },
        1100
      ),
      $('.nav-tab-menu .nav-item2').animate(
        { opacity: '1', paddingTop: '25px' },
        1200
      ),
      $('.nav-tab-menu .nav-item3').animate(
        { opacity: '1', paddingTop: '25px' },
        1300
      ),
      $('.nav-tab-menu .nav-item4').animate(
        { opacity: '1', paddingTop: '25px' },
        1400
      ),
      $('.nav-tab-menu .nav-item5').animate(
        { opacity: '1', paddingTop: '25px' },
        1500
      ),
      $('.nav-tab-menu .nav-item6').animate(
        { opacity: '1', paddingTop: '25px' },
        1600
      );
  } else {
    $('.nav-tab-menu li').animate({ opacity: '0', paddingTop: '500px' }, 500);
  }
});
const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&sort_by=popularity.desc`;

const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

const getMovies = async (url) => {
  const { results } = await fetch(url).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
      fav: false,
    })
  );
  allMovies = movies;
  return movies;
};

const fetchData = async () => {
  const movies = await getMovies(API_URL);
  show(movies);
};

fetchData();
//search

$('#api').keyup(async () => {
  let apiTxt = $('#api').val();
  //   console.log('apiTxt', apiTxt);
  if (apiTxt != '') {
    const API_SEARCH = `https://api.themoviedb.org/3/search/movie?query=${apiTxt}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&sort_by=popularity.desc`;
    const movie = await getMovies(API_SEARCH);
    // console.log(movie);
    show(movie);
  }
});
$('#word').keyup(() => {
  var movie = [];
  let wordTxt = $('#word').val();
  if (wordTxt != '' || wordTxt != undefined) {
    for (let i = 0; i < allMovies.length; i++) {
      if (allMovies[i].title.toLowerCase().includes(wordTxt.toLowerCase())) {
        movie.push(allMovies[i]);
      }
    }
    show(movie);
  }
});
//nav
$('ul li').click(function (e) {
  // console.log('e', e);
  let apiCategory = $(e.target).attr('id');
  console.log('apiCategory', apiCategory);
  if (apiCategory != undefined || apiCategory != null) {
    // console.log(apiCategory);
    const api_nav = `https://api.themoviedb.org/3/movie/${apiCategory}?api_key=17be26625eacc8f82fc40b8cd21dc4a3`;
    console.log(api_nav);
    const go = async () => {
      const movie = await getMovies(api_nav);
      show(movie);
    };
    go();
  }
});
// rate
const rating = (rating) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill(
    ' <svg class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'
  );
  const r = [
    ...Array(filledStars).fill(
      ' <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'
    ),
    ...maxStars,
  ].join(' ');
  return r;
};

// show
const show = (movies) => {
  var cont = '';
  for (let i = 0; i < movies.length; i++) {
    let type = [...movies[i].genres];
    var star = rating(movies[i].rating);
    if (movies[i].poster == null || movies[i].poster == undefined) {
      movies[i].poster =
        'https://upload.wikimedia.org/wikipedia/commons/f/f4/Marca_Per%C3%BA.jpg';
    }

    cont += `
       <div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 p-4">
        <div class="c-card block  shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        <div class="relative overflow-hidden group  transition-all">
          <img class="  h-full w-full object-cover" src="${
            movies[i].poster
          }" alt="">
          <div class="w-full h-full bg-white opacity-0  rounded absolute flex justify-center items-center -bottom-56 ease-in duration-500  transition-all group-hover:bottom-0 group-hover:opacity-90 ">
          <div class='flex-col justify-center items-center text-center px-2'>
           <h1 class='text-black text-2xl'>${movies[i].title}</h1>
           <p class='text-black '>${movies[i].description.substring(0, 150)}</p>
           <p class='text-red-400  mt-3 '>${type}</p>
      <div class="flex items-center mt-3 justify-center">
  ${star}
</div>
           </div>
           </div>
        </div>
       
      </div>
      </div>
    `;
  }
  document.getElementById('here').innerHTML = cont;
};
//regs

$('#name').keyup(() => {
  var name = /^[a-zA-Z0-9]+$/;
  name.test($('#name').val())
    ? (document.getElementById('nameVal').innerHTML = 'valid')
    : (document.getElementById('nameVal').innerHTML = 'not Valid');
});
$('#phone').keyup(() => {
  var phoneReg = /^(002)?(01)[0-25][0-9]{8}$/;
  phoneReg.test($('#phone').val())
    ? (document.getElementById('phoneVal').innerHTML = 'valid')
    : (document.getElementById('phoneVal').innerHTML = 'not Valid');
});
