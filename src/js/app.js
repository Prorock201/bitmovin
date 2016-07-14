require('../css/main.css');

window.onload = function() {
  let animationContainer = document.getElementById('animationcontainer');
  let downloadLink = document.getElementById('download');
  let boxClose = document.getElementById('boxclose');
  let isDownloadLinkRemove = false;
  let player = window.bitdash('player');

  downloadLink.setAttribute('download', 'download');

  let conf = {
    events: {
      onDownloadFinished: function() {
        downloadLink.setAttribute('href', linkForDownload);
      },
      onTimeChanged: function(data) {
        if (data.time > player.getDuration()/2 && !isDownloadLinkRemove) {
          animationContainer.style.display = 'block';
          animationContainer.classList.add('slideRight');
          setTimeout(showDownloadLink, 2000);
          boxClose.onclick = removeDownloadLink;
        }
      }
    },
    key:              '211bd6a5-feb4-4bd2-b39c-409fb3587678',
    source: {
      dash:           '//bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
      hls:            '//bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      progressive:    '//bitdash-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4',
      poster:         '//bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg',
      vr: {
        startupMode       : 'off',
        startPosition     : 180,
        initialRotation   : true,
        initialRotateRate : 0.025
      }
    },
    style: {
      width:          '100%',
      aspectratio:    '16:9',
      controls:       true
    }
  };

  let linkForDownload = conf.source.progressive;

  player.setup(conf).then(function() {
    // Success
    console.log('Successfully created bitdash player instance');
  }, function() {
    // Error!
    console.log('Error while creating bitdash player instance');
  });

  function showDownloadLink() {
    boxClose.style.display = 'block';
  }

  function removeDownloadLink() {
    animationContainer.style.display = 'none';
    isDownloadLinkRemove = true;
  }

};