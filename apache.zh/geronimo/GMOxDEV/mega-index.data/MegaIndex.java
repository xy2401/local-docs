/**
 *
 * Copyright 2006 David Blevins
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package org.codehaus.swizzle.confluence;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.Collections;
import java.util.ArrayList;
import java.io.PrintStream;

/**
 * @version $Revision$ $Date$
 */
public class MegaIndex {

    public static void main(String[] args) throws Exception {
        new MegaIndex().main();
    }

    public void main() throws Exception {
        Confluence confluence = new Confluence("http://cwiki.apache.org/confluence/rpc/xmlrpc");
        confluence.login("<you>", "<your-pass>");

        String[] spaces = {"GMOxDOC10","GMOxDOC11","GMOxDOC12","GMOxDOC20","GMOxDOC21"};

        Map<String, PageSummary> pages = new TreeMap<String, PageSummary>();
        List<String> titles = new ArrayList<String>();

        for (String space : spaces) {
            for (PageSummary summary : (List<PageSummary>)confluence.getPages(space)) {
                pages.put(getLink(summary), summary);
                if (!titles.contains(summary.getTitle())) titles.add(summary.getTitle());
            }
        }

        Collections.sort(titles);

        PrintStream out = System.out;

        out.print("|| Page Title  || ");
        for (String space : spaces) {
            out.print(space + " || ");
        }
        out.println("");

        for (String title : titles) {
            out.print("| " + title + " | ");
            for (String space : spaces) {
                String link = getLink(space, title);
                PageSummary summary = pages.get(link);
                if (summary == null){
                    out.print("[-|" + link + "]");
                } else {
                    Page page = confluence.getPage(summary.getId());
                    int length = page.getContent().length();
                    if (length > 4){
                        out.print("*");
                        out.print("[" + length + "|" + link + "]");
                        out.print("*");
                    } else {
                        out.print("[" + length + "|" + link + "]");
                    }
                }
                out.print(" | ");
            }
            out.println("");
        }
    }

    private String getLink(PageSummary summary) {
        return getLink(summary.getSpace(), summary.getTitle());
    }

    private String getLink(String space, String title) {
        return space +":"+title;
    }

}
