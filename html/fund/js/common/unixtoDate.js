(function($) {
    $.extend({
        myTime: {
            /**
             * 当前时间戳
             * @return <int>        unix时间戳(秒)   
             */
            CurTime: function(){
                return Date.parse(new Date());
            },
            /**               
             * 日期 转换为 Unix时间戳 
             * @param <string>      日期格式               
             * @return <int>        unix时间戳(秒)               
             */
            DateToUnix: function(string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                        )).getTime();
            },
            /**               
             * 时间戳转换日期               
             * @param <int> unixTime    待时间戳(秒)               
             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)               
             * @param <int>  timeZone   时区               
             */
            UnixToDate: function(unixTime, isFull, timeZone) {
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getFullYear() + "-";
                if(time.getMonth()+1 > 9){
                	ymdhis += (time.getMonth()+1) + "-";
                }else{
                	ymdhis += '0' +(time.getMonth()+1) + "-";
                }
                if(time.getDate() > 9){
                	ymdhis += time.getDate();
                }else{
                	ymdhis += '0'+time.getDate();
                }
                if (isFull === true)
                {
                    ymdhis += " " + time.getUTCHours() + ":";
                    ymdhis += time.getUTCMinutes() + ":";
                    ymdhis += time.getUTCSeconds();
                }
                return ymdhis;
            },
            /**
             * 解压日期
             * return unixtime
             */
            DecodeDate: function(date){
            	return date * 100000 + 1104508800000;
            },
            /**
             * 格式化日期 
             */
            FormatDate: function(date){
            	return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
            },
            /**
             * 根据num分隔日期
             */
            PastDate: function(date,num){
            	var myDate = new Date(date);
        		myDate.setMonth(myDate.getMonth() - num);
        		return $.myTime.DateToUnix($.myTime.FormatDate(myDate));
            },
            /**
             * 根据一个秒数，计算多少个月 
             */
            DifferMonth: function(second){
            	return Math.ceil(second / (86400 * 30));
            }
            
        }
    });
    
})(jQuery);