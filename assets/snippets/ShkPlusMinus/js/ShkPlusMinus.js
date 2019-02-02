(function($){

    $(document).ready(function(){
        function initShkChangeCount() {
            var index = 0;
            $("#shopCart input[name='count']").each(function(){
                $(this).before("<span class='btn_shk_count btn_shk_count_minus' data-action='minus' data-index='" + index + "'>-</span>");
                $(this).after("<span class='btn_shk_count btn_shk_count_plus' data-action='plus' data-index='" + index + "'>+</span>");
                $(this).attr("data-index-inp",index);
                index++;
            })
        }

        initShkChangeCount();

        $(document).on("click", ".btn_shk_count", function(e) {
            e.preventDefault();
            var act = $(this).data("action");
            var index = $(this).data("index");
            var field = $(this).parent().find("input[name='count']");
            var newValue = false;
            if (act == 'minus' && field.val() > 1) {
                newValue = parseInt(field.val(), 0) - 1;
                field.val( newValue );
            }
            if (act == 'plus' && field.val() < 1000) {
                newValue = parseInt(field.val(), 0) + 1;
                field.val( newValue );
            }
            if (newValue) {
                var data2 = 'action=ShkChangeCount&index=' + index + '&count=' + newValue;
                $.ajax({
                    url: "assets/snippets/ShkPlusMinus/ajax.php",
                    data: data2,
                    type: "POST",
                    cache: false,
                    beforeSend:function() {},                   
                    success: function(msg) {
                        if (msg == 'ok') {
                            $("#shopCart").load(location.href + ' #shopCart > *', function() {
                                initShkChangeCount();
                            });
                        }
                    },
                    always: function(){}
                })
            }
        })



        $(document).on("change", "input[name='count']", function(e) {
            e.preventDefault();
            
            var index = $(this).data("index-inp");
            var field = $(this);
            var newValue = parseInt(field.val(), 0);
            
            
            if (newValue) {
                var data2 = 'action=ShkChangeCount&index=' + index + '&count=' + newValue;
                $.ajax({
                    url: "assets/snippets/ShkPlusMinus/ajax.php",
                    data: data2,
                    type: "POST",
                    cache: false,
                    beforeSend:function() {},                   
                    success: function(msg) {
                        if (msg == 'ok') {
                            $("#shopCart").load(location.href + ' #shopCart > *', function() {
                                initShkChangeCount();
                            });
                        }
                    },
                    always: function(){}
                })
            }
        })



    })

})(jQuery)




