import http.server
import ssl

server_address = ("127.0.0.1", 4443)

httpd = http.server.HTTPServer(
    server_address,
    http.server.SimpleHTTPRequestHandler
)

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)

context.load_cert_chain(
    certfile="localhost.crt",
    keyfile="localhost.key"
)

httpd.socket = context.wrap_socket(
    httpd.socket,
    server_side=True
)
Which step on your second correct because you are getting certificate not from not Google particular mobile phones but we have left with them up we are left with reasons and VSTs what are BSDs and research trees and traversal hashing and sort of surgery we have gone through a little bit about the SVS and hashing something like we haven't done any so we were left with that so I just want to cover them before I move on to the next topic so and you all know the trees has got yes so trees as you already know we have a moved and the left side and the right side parent child you remember we have gone to the left side of the tree letters what is the degree of a tree remember what you call it like parasol will go problem a little bit of glance of it so bringing surgery insertions they are sorted the tree degenerates into a strange line balance what is avial tree note of it and later on this search about it we have already gone to the area of it because we are talking about the graphs why do we use graph space to represent the relationship between two notes two notes but there are fish dreams only one very can represent not two yes anybody else in what situations we use raps trees we know that let suppose if I want to go for data we use binary trees suppose if I have taught hundred elements in that if I want to search for the fifty fifth element or forty eight element or like that create a graph by research very easy for us to move on and see because half of the tree will be we do not have to search habit because after something like that after fifty only research we won't search before fifty so the entire search elements will be half of it and then if it is fifty eight so before seventy four of searching elements will be very less in cases we use graphs that is my question shortest path algorithm what do you mean by shortest part algorithms all the way not like operations that are related to map it accordingly with a graph so that you can create so short as part we can just find out let's suppose if I want to go from a to b in this particular diagram I have different days like a to b I can go and then c and then that is first or else I can choose a to c and direct a to bich depends upon b because if I want the shortest way to be found then I go for a c and then b okay so in this way we just represent the shortest part if the data is not organized if the data is not organized and the data is just captured here and there in that case we just search the shortest path out of the given graph what do you mean by red first search in this what is can we go for breathful search in this diagram representation now data structure vfs will be first in first out right will the VS VFS be first in first out yes or no first in first out will be the VFS Dfs will be last in first out okay so generally if we have to follow see I need to say like in the breath in breath first search we generally go for cues we generally implice so for the generally implement so and here we go one below the other and yes in this shortest we just go for okay what is this unwated gaps to b two c two in DS in the first instaction is there in the shortest path in stacks just imagine the stacks there is no shortest path because we have to take all the elements out and then only we can reach the last elements there is no shortest part in that we have to go through all the steps and then memory usage where can we have many usage in both of them why in both of them is very hands number use cases neighbors we use because in the grants we just go for the latest neighbors and then certification or topographic sort. Now here in the stamp we need to just go into the cycle only because there is no other layout because we need to remove all the elements they only can fetch the last element so let's do first of all graphs first and then we will include we just maybe want to do this one is done first one more options shall leave you can go on top of twenty weeks you know that present you know we are all getting three thirty how much time it takes thirty minutes twenty thirty minutes
print("HTTPS server running at https://localhost:4443")

httpd.serve_forever()