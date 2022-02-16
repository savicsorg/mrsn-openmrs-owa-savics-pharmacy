angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('fr', {"ago":"depuis","January":"Janvier","February":"Février","March":"Mars","April":"Avril","May":"Mai","June":"Juin","July":"Juillet","August":"Août","September":"Septembre","October":"Octobre","November":"Novembre","December":"Décembre","unknown":"non-connue","second":"second","seconds":"secondes","minute":"minute","minutes":"minutes","hour":"heure","hours":"heures","day":"jour","days":"jours","Yesterday":"Hier","Sunday":"Dimanche","Monday":"Lundi","Tuesday":"Mardi","Wednesday":"Mercredi","Thursday":"Jeudi","Friday":"Vendredi","Saturday":"Samedi","Month(s)":"Mois","CONFIDENTIAL":"CONFIDENTIEL","Weekly":"Hebdomadaire","Monthly":"Mensuel","Quarterly":"Trimestriel","Please check if your phone number is a valid one.":"Veuillez vérifier si votre numéro de téléphone est valide.","Error":"Erreur","Toast dismissed.":"Toast rejeté.","Toast failed or was forced to close early by another toast.":"Toast a échoué ou a été forcé de fermer tôt par un autre toast.","Customer management":"Gestion des clients","New customer entry":"Entrée d’un nouveau client","Edit type entry":"Editer","Would you like to delete your data?":"Vous souhaitez supprimer vos données ?","If you choose `Yes` this record will be deleted and you will not be able to recover it":"Si vous choisissez 'Oui', cet enregistrement sera supprimé et vous ne pourrez pas le récupérer","Lucky day":"Jour de chance","Yes":"Oui","Cancel":"Annuler","Page":"Page",":":" :","Rows per page":"Lignes par page","of":"sur","An unexpected error has occured.":"Une erreur inattendue s’est produite.","New type entry":"Nouveau type","Please check if your input are valid ones.":"Veuillez vérifier si vos entrées sont valides.","is Well edited.":"est bien édité.","is Well saved.":"est bien enregistré.","we can't save your data.":"nous ne pouvons pas enregistrer vos données.","New location entry":"Nouvelle entrée d’emplacement","New route entry":"Nouvelle voie","New Supplier entry":"Entrée d’un nouveau fournisseur","Please check if your email is a valid one.":"Veuillez vérifier si votre e-mail est valide.","Too high quantity":"Quantité trop élevée","The quantity requested is higher than the quantity available in this lot. Please enter a quantity less than":"La quantité demandée est supérieure à la quantité disponible dans ce lot. Veuillez saisir une quantité inférieure à","OK":"OK","Data saved successfully.":"Données enregistrées avec succès.","Do you really want to delete this dispense ?":"Voulez-vous vraiment supprimer cette dispense ?","Data removed successfully.":"Données supprimées avec succès.","Do you really want to delete this line ? This action is irreversible if you click YES.":"Voulez-vous vraiment supprimer cette ligne ? Cette action est irréversible si vous cliquez sur OUI.","Confirmation":"Confirmation","Do you really want to validate this dispense ?":"Voulez-vous vraiment valider cette dispense ?","Do you really want to cancel this dispense ?":"Voulez-vous vraiment annuler cette distribution ?","Validate":"Valider","Initiated":"Initié","Validated on":"Validé le","Would you like to delete this dispensiation?":"Souhaitez-vous supprimer cette dispense ?","Drugs dispensing management":"Gestion de la distribution des médicaments","You must fill in the required fields before you proceed.":"Vous devez remplir les champs obligatoires avant de continuer.","The product code must be between 3 and 120 characters max.":"Le code produit doit comporter entre 3 et 120 caractères max.","The product name must not be empty.":"Le nom du produit ne doit pas être vide.","Attention, the drug code you entered is already used. Please use another one.":"Attention, le code que vous avez entré est déjà utilisé. Veuillez en utiliser un autre.","Database constraint violation":"Violation des contraintes de base de données","You cannot delete a drug that has existing batches.":"Vous ne pouvez pas supprimer un médicament qui a des lots existants.","Add New batch":"Ajouter un nouveau lot","Attention, you cannot make new transactions while you already have old one(s) waiting for approval. Please, go to drug history and approve or reject all previous transactions before proceeding.":"Attention, vous ne pouvez pas effectuer de nouvelles transactions alors que vous avez déjà d’anciennes transactions en attente d’approbation. S’il vous plaît, allez à l’historique des médicaments et approuvez ou rejetez toutes les transactions précédentes avant de continuer.","Transaction type are missing.":"Le type de transaction est manquant.","Adjustment":"Ajustement","Inventory":"Inventaire","Success":"Succès","Do you really want to delete this reception ? This will impact available stock":"Voulez-vous vraiment supprimer cette réception ? Cela aura un impact sur le stock disponible","Do you really want to reject this adjustment ?":"Voulez-vous vraiment rejeter cet ajustement ?","Operation done successfully.":"Opération effectuée avec succès.","Do you really want to approve this adjustment ?":"Voulez-vous vraiment approuver cet ajustement ?","Transaction details":"Détails de la transaction","View transaction details":"Afficher les détails de la transaction","Rejected":"Rejeté","Approved":"Approuvé","Would you like to hide this data?":"Souhaitez-vous masquer ces données ?","If you choose `Yes` this record will be hidden":"Si vous choisissez 'Oui', cet enregistrement sera masqué","Stock detail for:":"Détail du stock pour:","View detail":"Voir les détails","View history":"Afficher l'historique","Do you really want to approve this order ?":"Voulez-vous vraiment approuver cette commande ?","Do you really want to delete this order ?":"Voulez-vous vraiment supprimer cette commande ?","Do you really want to create a new order ?":"Voulez-vous vraiment créer une nouvelle commande ?","No supplier registered. Please add from Settings":"Aucun fournisseur enregistré. Veuillez ajouter à partir des paramètres","Approve":"Approuver","Approved on":"Validé le","Orders":"Commandes","View Order":"Voir la commande","Order to Supplier":"Commande au fournisseur","input cannot be less than 1":"l’entrée ne peut pas être inférieure à 1","Something gone wrong":"Quelque chose a mal tourné","General Informations":"Informations générales","Code":"Code","Name":"Nom","Type":"Type","Address":"Adresse","Email":"Email","Tel":"Tél","Please wait...":"Veuillez patienter...","Save":"Enregistrer","Search for Customers name...":"Rechercher le nom des clients...","Customers management":"Gestion des clients","Back":"Retour","New":"Nouveau","Add New":"Ajouter","Actions":"Actions","Search for Customer Types name...":"Rechercher le nom des types de clients...","Search for Locations name...":"Rechercher le nom des emplacements...","Locations Management":"Gestion des emplacements","Settings":"Paramètres","Drugs Management":"Gestion des médicaments","Units Management":"Gestion des formes galéniques","Routes Management":"Gestion - voie d’admission","Suppliers Management":"Gestion des fournisseurs","Customer Types Management":"Gestion des types de clients","Customers Management":"Gestion des clients","Search for Routes name...":"Rechercher parmi les voies d’admission..","Search for Suppliers name...":"Rechercher le nom des fournisseurs...","Action":"Action","Search for Units name...":"Rechercher les formes du médicament..","Pharmacy management module":"Module de gestion de pharmacie","Orders Management":"Gestion des commandes","Stock and Inventory":"Stock et inventaire","Pharmacy Module Configuration":"Configuration du module pharmacie","Drugs dispense":"Dispense de médicaments","Customer":"Client","Patient (with active visit)":"Patient (avec visite active)","Drug":"Médicament","Dispense Drugs":"Dispense de médicaments","Dispense Details":"Détail de la dispense","Type of Dispensation":"Type de dispense","Date":"Date","No matches found.":"Aucun résultat trouvé.","List of drugs":"Liste des médicaments","If you want to modify the dispense of one of the drugs, you must delete the line and recreate it":"Si vous souhaitez modifier la distribution de l’un des médicaments, vous devez supprimer la ligne et la recréer","Batch n°":"Lot n°","Batch N°:":"Lot N° :","Qty v.:":"Qté v. :","Loc.:":"Loc. :","Exp.:":"Exp. :","Quantity":"Quantité","Price":"Prix","Add a line":"Ajouter une ligne","Total":"Total","Search for Refs. / Customers...":"Rechercher des réfs. / Clients...","Drugs Dispensing Management":"Gestion de la distribution des médicaments","Stock at risk":"Stock à risque","Ref.":"Réf.","Type Dispensation":"Type de dispense","Number of Batches":"Nombre de lots","Amount":"Montant","Edit":"Editer","Delete":"Supprimer","Dispense Detail":"Détail de la distribution","Search drug":"Rechercher un médicament","Add/Modify a drug":"Ajouter/modifier un médicament","Unit":"Forme","Route":"Voie d’admission","Inventory Informations":"Informations sur l’inventaire","Buying Price":"Prix d’achat","Selling Price":"Prix de vente","Min Stock":"Stock min","Max Stock":"Stock maximal","Description":"Description","Search for Drugs name...":"Rechercher le nom des médicaments...","Export":"Exporter","Designation":"Désignation","View":"Détail","General Information":"Informations générales","Units & Routes":"Formes & voies","Prices":"Prix","Soh":"Soh","Batch":"Lot","Location":"Emplacement","Expiration Date":"Date d'expiration","Diff virtual-physical Qty":"Diff qté virt-phys","Virtual Qty":"Qté virtuelle","Physical Qty":"Qté physique","adjustment":"ajustement","Batch Number":"Numéro de lot","Counted Quantity":"Quantité comptée","The adjustment that will will be operated:":"Ajustement opéré sur la qtté physique :","Reason":"Raison","Reception of drugs":"Réception de produits","Reception Information":"Informations sur la réception","Order n°":"Commande N°","Date of Reception":"Date de réception","List of items received":"Liste des éléments reçus","Date of expiry":"Date d’expiration","Remove":"Supprimer","Search for reception n°...":"Rechercher la réception n°...","Receptions":"Réceptions","Received by":"Réceptionné par","Transaction Informations":"Informations sur la transaction","Item Name":"Nom du produit","Item ID":"ID produit","Operation Type":"Type d’opération","Quantitiy":"Quantité","Status":"Statut","Operation Date":"Date de l'opération","Author Informations":"Informations sur l’auteur","Search...":"Rechercher...","Stock details for":"Détails du stock pour","Expired batches only":"Lots expirés uniquement","Exp Date":"Date exp","History":"Historique","Stocktake":"Inventaire","Add Batch":"Ajouter un lot","Transaction":"Transaction","Bath Name":"Nom du lot","Transaction Type":"Type de transaction","Transaction Qty":"Qté de transaction","Date Modified":"Date de modification","Transaction Detail":"Détail de la transaction","Stock at Risk only":"Stock à risque uniquement","Drug Name":"Nom du médicament","Min Qty":"Qté Min","Max Qty":"Qté max","lot(s) expired":"lot(s) expiré(s)","expiring lot(s)":"lot(s) expirant(s)","Stock details":"Détails du stock","Place an order":"Passer une commande","Order information":"Informations de la commande","Supplier":"Fournisseur","Label":"Étiquette","Total:":"Total :","Search for Orders n°...":"Rechercher des commandes par n°..","Orders management":"Gestion des commandes","Date of reception":"Date de réception","Receive":"Réceptionner","List of Drugs":"Liste des médicaments","New order details":"Détails de la nouvelle commande","Supplier Name":"Nom du fournisseur","Order N°":"Commande N°","List of drug to order":"Liste des médicaments à commander","Avl Qty":"Qté disponible","Qty":"Qté","Qty to Order":"Qté à commander","Add Fields":"Ajouter des champs","Supplier Order Management":"Gestion des commandes des fournisseurs","Other Drugs":"Autres médicaments","Order No":"Commande N°","Approbation Date":"Date d’approbation","Reception Date":"Date de réception","Total Amount":"Montant total","Received":"Réceptionné","Search by name and code...":"Rechercher par nom et code..","Stocks at risk management":"Gestion du stock à risque","Print":"Imprimer","Available Qty":"Qté disponible"});
/* jshint +W100 */
}]);