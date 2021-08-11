#!/bin/bash

echo "Content-type: text/html"
echo ""

echo '<html>'
echo '<head>'
echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
echo '<title>Foo</title>'
echo '</head>'
echo '<body>'

echo "<p>Start</p>"

if [ "$REQUEST_METHOD" = "POST" ]; then
    echo "<p>Post Method</p>"
    if [ "$CONTENT_LENGTH" -gt 0 ]; then
	in_raw="$(cat)"
	echo  $in_raw "<p>"

	IFS='&' read -ra VARS <<< "$in_raw"
	for i in "${VARS[@]}"; do
	    IFS='=' read -ra PART <<< "$i"
	    for j in "${PART[@]}"; do	    
	    echo "$j <p>" 
	    done
	done
	      
	      #	echo `echo $in_raw | sed s:'&'::g`
#	boundary=$(echo -n "$in_raw" | head -1 | tr -d '\r\n');
#	filename=$(echo -n "$in_raw" | grep --text --max-count=1 -oP "(?<=filename=\")[^\"]*");
#	file_content=$(echo -n "$in_raw" | sed '1,/Content-Type:/d' | tail -c +3 | head --lines=-1 | head --bytes=-4  );
#	echo -e "boundary: $boundary "
#	echo -e "filename: $filename "
	#echo "file_content: $file_content"
    fi
fi

echo '

<form action="post.cgi" method="post">
<label for="fname">First name:</label>
<input type="text" id="fname" name="fname"><br><br>
<label for="lname">Last name:</label>
<input type="text" id="lname" name="lname"><br><br>
<input type="submit" value="Submit">
</form>

'

echo '</body>'
echo '</html>'

exit 0
