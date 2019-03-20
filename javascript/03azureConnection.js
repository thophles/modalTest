//Azure Sas Token
var sas = "?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-12-01T00:10:10Z&st=2019-03-15T15:10:10Z&spr=https&sig=VmUJg8pzaJKeaAbccbP3wn3SOUjzAKgKl5EdTBpn3rM%3D";
var imageDiv = document.getElementsByClassName("imageDiv");
var account = '';
var blobUri = '';
var container = '';


function checkParameters()
{
   account = 'btcurbanairshipstorint';

   if (account == null || account.length < 1)
   {
       alert('Please enter a valid storage account name!');
       return false;
   }
   if (sas == null || sas.length < 1)
   {
       alert('Please enter a valid SAS Token!');
       return false;
   }

   return true;
}

//Create Blob Service with Account and Sas
function getBlobService()
{
   if (!checkParameters())
       return null;

   blobUri = 'https://' + account + '.blob.core.windows.net';
   var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, sas).withFilter(new AzureStorage.Blob.ExponentialRetryPolicyFilter());
   return blobService;
}

//List out the retrieved containers
function refreshContainer()
{
   var blobService = getBlobService();
   if (!blobService)
       return;

   blobService.listContainersSegmented(null, function (error, results) {
       if (error)
       {
           console.log('List container error, please open browser console to view detailed error');
           console.log(error);
       }
       else
       {
           if (results.entries.length < 1)
           {
               output.push('<tr><td>Empty results...</td></tr>');
           }
           for (var i = 0, container; container = results.entries[i]; i++)
           {
              console.log(container.name);
           }
       }
   });
}

//select found container
function viewContainer(selectedContainer) {
   container = selectedContainer;
   container = "assets";
   refreshBlobList();
}

//list out blobs found in the container
function refreshBlobList()
{
   var blobService = getBlobService();
   if (!blobService)
       return;
   blobService.createContainerIfNotExists(container, function(error, result)
   {
       if (error)
       {
           console.log(error);
       }
       else
       {
           blobService.listBlobsSegmented(container, null, function (error, results)
           {
               if (error)
               {
                   console.log(error);
               }
               else
               {
                   if (results.entries.length < 1)
                   {
                       console.log("Empty");
                   }
                   for (var i = 0; i < imageDiv.length; i++)
                   {

                     for (var i = 0, blob; blob = results.entries[i]; i++)
                     {
                        blobURL = blobUri + '/' + container + '/' + blob.name + sas;
                        console.log(blobURL);

                          imageDiv[i].style.backgroundImage = "url(" + blobURL + ")";
                          imageDiv[i].style.backgroundRepeat = "no-repeat";
                          imageDiv[i].style.backgroundPosition = "center";
                          imageDiv[i].style.backgroundSize = "cover";

                     }
                  }
                }
           });
       }
   })
}

function deleteBlob(blob)
{
   var blobService = getBlobService();
   if (!blobService)
       return;

   blobService.deleteBlobIfExists(container, blob, function(error, result) {
       if (error) {
           alert('Delete blob failed, open browser console for more detailed info.');
           console.log(error);
       } else {
           alert('Delete ' + blob + ' successfully!');
           refreshBlobList();
       }
   });
}

function embedBlob(blob)
{
  var blobService = getBlobService();
  if (!blobService)
      return;




}

// checkParameters();
// getBlobService();
refreshContainer();
viewContainer("assets");
refreshBlobList();
