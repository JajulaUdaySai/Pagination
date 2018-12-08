function PaginationWithSearch(PaginationObject, event) { 
    RemovePrevSettings(PaginationObject);
    SetupPagination(PaginationObject);
    $("#" + PaginationObject.ContentID).css("height", $("#" + PaginationObject.ContentID).height());
}
function RemovePrevSettings(PaginationObject) {
    $("#" + PaginationObject.ContentID + "PaginationNavBar").remove();
    $("#" + PaginationObject.ContentID).children().each(function (rev, element) {
        $(element).removeClass("ItmActive");
        $(element).removeClass("data-Index");
        $(element).removeClass("HdnPgItm");
    });
}
function SetupPagination(PaginationObject) {
    $("#" + PaginationObject.ContentID).attr("unselectable", "on");
    $("#" + PaginationObject.ContentID).attr("onselectstart", "return false");
    $("#" + PaginationObject.ContentID).attr("onmousedown", "return false");
    $("#" + PaginationObject.ContentID).addClass("Unselect");
    var searchId = PaginationObject.SearchBoxId;
    if (isNotNull(searchId)) {
        $("#" + searchId).attr("onkeyup", "PaginationWithSearch({ContentID:'" + PaginationObject.ContentID + "',UserNumberOfItemVisiblePerPage:" + PaginationObject.UserNumberOfItemVisiblePerPage + ",NumberOfItemInPaginationNav:" + PaginationObject.NumberOfItemInPaginationNav + ",SearchBoxId:'" + PaginationObject.SearchBoxId + "'},event)");
        var SearchText = $("#" + PaginationObject.SearchBoxId).val().toLowerCase().trim();
        if (isNotNull(SearchText)) {
            $("#" + PaginationObject.ContentID).children().each(function (rev, element) {
                var Tags = $(element).attr("data-SearchTag");
                if (isNotNull(Tags)) {
                    if (Tags.indexOf(SearchText) > -1) {
                        $(element).addClass("ItmActive");
                    }
                }
            });
        }
        else {
            $("#" + PaginationObject.ContentID).children().each(function (rev, element) {
                $(element).addClass("ItmActive");
            });
        }
    }
    else {
        $("#" + PaginationObject.ContentID).children().each(function (rev, element) {
            $(element).addClass("ItmActive");
        });
    }

   
    Pagination({
        ContentID: PaginationObject.ContentID,
        UserNumberOfItemVisiblePerPage: PaginationObject.UserNumberOfItemVisiblePerPage,
        NumberOfItemInPaginationNav: PaginationObject.NumberOfItemInPaginationNav
    });       
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
    $("#" + PaginationObject.ContentID).children().each(function (rev, element) {
        $(element).removeAttr("data-Index");
    });
    $("#" + PaginationObject.ContentID).children(".ItmActive").each(function (rev, element) {
        if (ActualNumberOfItemsShown < (rev + 1)) {
            $(element).addClass("HdnPgItm");
        }        
            $(element).attr("data-Index", rev + 1);
    });
    $("#" + PaginationObject.ContentID).children(":not(.ItmActive)").each(function (rev, element) {
         $(element).addClass("HdnPgItm");       
    });
    //Setting Nav Bar for Pagination
    if (ActualNumberOfItemsShown !== 0) {
        $("#" + PaginationObject.ContentID + "PaginationNavBar").empty();
        $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span class=\"DfltPgnBtn PgnBtnDsbld PgnPrevBtn\" onclick=\"PgnPreBtn(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\">" + "Previous" + "</span>");
        $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span data-Index=" + 1 + " onclick=\"ChangePage(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\" class=\"PgnActive PgnBtn\">" + 1 + "</span>");
        for (var i = 2; i <= NumberOfItemsInPaninationNavNeeded; i++) {
            if (i > ActualNumberOfItemsShownInNavBar) {
                $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span data-Index=" + i + " onclick=\"ChangePage(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\" class=\"HdnPgItm PgnBtn\">" + i + "</span>");
            }
            else {
                $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span data-Index=" + i + " onclick=\"ChangePage(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\" class=\"PgnBtn\">" + i + "</span>");
            }

        }
        if (NumberOfItemsInPaninationNavNeeded === 1) {
            $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span class=\"DfltPgnBtn PgnBtnDsbld PgnNxtBtn\" onclick=\"PgnNxtBtn(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\">" + "Next" + "</span>");
        }
        else {
            $("#" + PaginationObject.ContentID + "PaginationNavBar").append("<span class=\"DfltPgnBtn PgnNxtBtn\" onclick=\"PgnNxtBtn(event," + NumberOfItems + "," + ActualNumberOfItemsShown + "," + NumberOfItemsInPaninationNavNeeded + "," + ActualNumberOfItemsShownInNavBar + ")\">" + "Next" + "</span>");
        }
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
        var ThisEle =  parseInt($(element).attr("data-Index"));
        if (ThisEle <= To && ThisEle >= From) {
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
function isNotNull(searchId) {
    var IsErr = false;
    if (searchId !== undefined && searchId !== null && searchId !== "") {
        IsErr = true;
    }
    else {
        IsErr = false;
    }
    return IsErr;
}