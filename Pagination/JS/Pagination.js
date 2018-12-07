function PaginationWithSearch(PaginationObject) {
    var searchId = PaginationObject.SearchBoxId;
    if (searchId !== undefined && searchId !== null && searchId !== "") {
        var SearchText = $("#" + PaginationObject.SearchBoxId).val().toLowerCase().trim();
    }
    else {
        $("#" + PaginationObject.ContentID).attr("unselectable", "on");
        $("#" + PaginationObject.ContentID).attr("onselectstart", "return false");
        $("#" + PaginationObject.ContentID).attr("onmousedown", "return false");
        $("#" + PaginationObject.ContentID).addClass("Unselect");
        $("#" + PaginationObject.ContentID).children().each(function (rev, element) {
            $(element).addClass("ItmActive");          
        });
        Pagination({
            ContentID: PaginationObject.ContentID,
            UserNumberOfItemVisiblePerPage: PaginationObject.UserNumberOfItemVisiblePerPage,
            NumberOfItemInPaginationNav: PaginationObject.NumberOfItemInPaginationNav
        });
    }
}
function Pagination(PaginationObject) {
    $("<div id=" + PaginationObject.ContentID + "PaginationNavBar" + " class=\"Unselect\" unselectable=\"on\" onselectstart=\"return false; \" onmousedown=\"return false;\" ><div>").insertAfter("#" + PaginationObject.ContentID);
    //Data Passed By User
    var UserNumberOfItemVisiblePerPage = PaginationObject.UserNumberOfItemVisiblePerPage;
    var UserNumberOfItemsInVisibleInPaginationNav = PaginationObject.NumberOfItemInPaginationNav;

    var ActualNumberOfItemsShownInNavBar = 0;
    var ActualNumberOfItemsShown = 0;
    var NumberOfItemsInPaninationNavNeeded = 0;

    var NumberOfItems = $("#" + PaginationObject.ContentID).children(".ItmActive").length;

    //Calculating NavBar and Items for Pagination
    if (UserNumberOfItemVisiblePerPage < NumberOfItems) {
        ActualNumberOfItemsShown = UserNumberOfItemVisiblePerPage;
        NumberOfItemsInPaninationNavNeeded = Math.ceil(NumberOfItems / UserNumberOfItemVisiblePerPage);
    }
    else {
        ActualNumberOfItemsShown = NumberOfItems;
        NumberOfItemsInPaninationNavNeeded = 1;
    }
    if (UserNumberOfItemsInVisibleInPaginationNav > NumberOfItemsInPaninationNavNeeded) {
        ActualNumberOfItemsShownInNavBar = NumberOfItemsInPaninationNavNeeded;
    }
    else {
        ActualNumberOfItemsShownInNavBar = UserNumberOfItemsInVisibleInPaginationNav;
    }
    //Setting Index For Every Item 
    $("#" + PaginationObject.ContentID).children(".ItmActive").each(function (rev, element) {
        if ((rev + 1) > ActualNumberOfItemsShown) {
            $(element).addClass("HdnPgItm");
        }
        $(element).attr("data-Index", rev + 1);
    });
    //Setting Nav Bar for Pagination
    $("#" + PaginationObject.ContentID + "PaginationNavBar").empty();
    $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span class=\"DfltPgnBtn PgnBtnDsbld\" onclick=\"PgnPreBtn(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\">" + "Previous" + "</span>");
    $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span data-Index=" + 1 + " onclick=\"ChangePage(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\" class=\"PgnActive\">" + 1 + "</span>");
    for (var i = 2; i <= NumberOfItemsInPaninationNavNeeded; i++) {
        if (i > ActualNumberOfItemsShownInNavBar) {
            $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span data-Index=" + i + " onclick=\"ChangePage(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\" class=\"HdnPgItm\">" + i + "</span>");
        }
        else {           
            $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span data-Index=" + i + " onclick=\"ChangePage(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\">" + i + "</span>");
        }

    }
    if (NumberOfItemsInPaninationNavNeeded === 1) {
        $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span class=\"DfltPgnBtn PgnBtnDsbld\" onclick=\"PgnNxtBtn(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\">" + "Next" + "</span>");
    }
    else {
        $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span class=\"DfltPgnBtn\" onclick=\"PgnNxtBtn(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\">" + "Next" + "</span>");
    }
}
//On Page Change
function ChangePage(event, TotalItem, TotalVisibleItem, TotalItemInNav, TotalVisibleItemInNav) {
    var Element = event.target;
    $(Element).siblings().removeClass("PgnActive");
    $(Element).addClass("PgnActive");
    var SelectedPage = $(Element).attr("data-Index");
    SetPageReadyFor(Element, SelectedPage, TotalVisibleItem, TotalItemInNav);  
}
//Set Items
function SetPageReadyFor(Element, SelectedPage, TotalVisible, Total) {
    var From = (TotalVisible * (SelectedPage - 1)) + 1;
    var To = From + (TotalVisible - 1);
    $(Element).parent().prev().children().addClass("HdnPgItm");
    $(Element).parent().prev().children().each(function (index, element) {
        if ((index + 1) <= To && (index + 1) >= From) {
            $(this).removeClass("HdnPgItm");
        }
    });
    EnableOrDisableNextAndPrev(Element, SelectedPage, Total);
}
//Set Active Next Page Nav
function PgnNxtBtn(event, TotalItem, TotalVisibleItem, TotalItemInNav, TotalVisibleItemInNav) {   
    var Element = event.target;
    if (!$(Element).hasClass("PgnBtnDsbld")) {
        var Active = parseInt($(Element).siblings(".PgnActive").attr("data-Index"));
        var SelectedPage = Active + 1;
        $(Element).siblings().prev(".DfltPgnBtn").removeClass("PgnBtnDsbld");
        
        if ($(Element).siblings('[data-Index=' + SelectedPage + ']').hasClass("HdnPgItm")) {           
            var From = SelectedPage;
            var To = SelectedPage + (TotalVisibleItemInNav - 1);
            SetNavBar(Element, From, To);
        }
        RefreshNav(Element, SelectedPage, TotalVisibleItem, TotalItemInNav);    
    }
}
//Set Active Previous Page Nav
function PgnPreBtn(event, TotalItem, TotalVisibleItem, TotalItemInNav, TotalVisibleItemInNav) {    
    var Element = event.target;
    if (!$(Element).hasClass("PgnBtnDsbld")) {
        var Active = parseInt($(Element).siblings(".PgnActive").attr("data-Index"));
        var SelectedPage = Active - 1;
        
        if ($(Element).siblings('[data-Index=' + SelectedPage + ']').hasClass("HdnPgItm")) {
            var From = 0;
            if (TotalVisibleItemInNav === 1) {
                From = SelectedPage;
            }
            else {
                From = SelectedPage - TotalVisibleItemInNav;
            }
            var To = SelectedPage;
            SetNavBar(Element, From, To);
        }
        RefreshNav(Element, SelectedPage, TotalVisibleItem, TotalItemInNav);
    }
}
function RefreshNav(Element, SelectedPage, TotalVisibleItem, TotalItemInNav) {  
    $(Element).siblings().next(".DfltPgnBtn").removeClass("PgnBtnDsbld");
    $(Element).siblings().removeClass("PgnActive");
    $(Element).siblings('[data-Index=' + SelectedPage + ']').addClass("PgnActive");
    SetPageReadyFor(Element, SelectedPage, TotalVisibleItem, TotalItemInNav);
}
function SetNavBar(Element, From, To) {
    $(Element).parent().children('span:not(.DfltPgnBtn)').addClass("HdnPgItm");
    $(Element).parent().children('span:not(.DfltPgnBtn)').each(function (index, element) {
        if ((index + 1) <= To && (index + 1) >= From) {
            $(this).removeClass("HdnPgItm");
        }
    });
}
function EnableOrDisableNextAndPrev(Element, SelectedPage, Total) {
    if (parseInt(SelectedPage) === 1) {
        if ($(Element).siblings().prev(".DfltPgnBtn").length === 1) {
            $(Element).siblings().prev(".DfltPgnBtn").addClass("PgnBtnDsbld");
        }
        else {
            $(Element).prev(".DfltPgnBtn").addClass("PgnBtnDsbld");
        }
    }
    else {
        $(Element).siblings().prev(".DfltPgnBtn").removeClass("PgnBtnDsbld");
    }    
    if (Total === parseInt(SelectedPage)) {
        if ($(Element).siblings().next(".DfltPgnBtn").length === 1) {
            $(Element).siblings().next(".DfltPgnBtn").addClass("PgnBtnDsbld");
        }
        else {
            $(Element).next(".DfltPgnBtn").addClass("PgnBtnDsbld");
        }       
    }
    else {
        $(Element).siblings().next(".DfltPgnBtn").removeClass("PgnBtnDsbld");
    }
}