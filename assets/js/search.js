/*
 * Copyright 2018 ThoughtWorks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Search = function (searchField, dropdownMenu) {
	const searchObj = this;
	let data = null;
	searchObj.init = function () {
		$(searchField).keyup(function () {
			searchRequest($(this).val());
		});

		$.ajax({
			type: 'GET',
			url: '/all_api.json'
		}).done(function (result) {
			data = filter(result);
		});
	};

	const filter = function (result) {
		const requestInfo = [];
		for (var key in result) {
			const items = result[key].item;
			for (var i in items) {
				const item = items[i];
				requestInfo.push({"name": item.name, "method": item.request.method});
			}
		}
		return requestInfo;
	};

	const searchRequest = function (queryStr) {
		$(dropdownMenu).html('');
		if (isEmpty(queryStr)) {
			$('.dropdown-toggle').dropdown('toggle');
			return;
		}

		for (var i = 0; i < data.length; i++) {
			const requestName = data[i].name;
			const requestMethod = data[i].method;
			const id = requestName.toLowerCase().replace(new RegExp(' ', 'g'), '-');
			if (requestName.toLowerCase().indexOf(queryStr.toLowerCase()) >= 0) {
				const anchor = $(`<a class="dropdown-item" href="#${id}">`);
				$(`<span class="method" name="${requestMethod}">${requestMethod}</span>`).appendTo(anchor);
				$(`<span class="request-name">${requestName}</span>`).appendTo(anchor);
				anchor.appendTo($(dropdownMenu));
				$(`<div class="dropdown-divider">`).appendTo($(dropdownMenu));
				registerClick(anchor);
			}
		}

		if ($('.dropdown').find('.dropdown-menu').is(":hidden")) {
			$('.dropdown-toggle').dropdown('toggle');
		}

		if ($(dropdownMenu).html().length == 0) {
			$('.dropdown-toggle').dropdown('toggle');
		}
	};

	const registerClick = function (ele) {
		ele.click(function (ele) {
			$(searchField).val('');
		});
	};

	const isEmpty = function (str) {
		return str == undefined || str == null || str.length == 0;
	};

	return searchObj;
};